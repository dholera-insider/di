import { createHash } from "node:crypto";

export class FormError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

// This bounds work within one Node process. Production still needs a shared/edge limiter.
const attempts = new Map();
const submissions = new Map();
const MAX_ENTRIES = 5000;
const WINDOW_MS = 60_000;
function prune(map, now) {
  for (const [key, entry] of map) if (entry.expires <= now) map.delete(key);
}
export function fingerprint(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function guardRequest(request) {
  const origin = request.headers.get("origin");
  const allowed = new Set([new URL(request.url).origin, "https://www.dholerainsider.com", "https://dholerainsider.com"]);
  if (origin && !allowed.has(origin)) throw new FormError(403, "This request is not allowed.");
  const now = Date.now();
  prune(attempts, now);
  // Only opt into an IP header if the deployment proxy overwrites it.
  const ipHeader = process.env.FORM_TRUSTED_IP_HEADER;
  const ip = ipHeader && request.headers.get(ipHeader)?.split(",")[0].trim();
  for (const [key, limit] of [["global", 120], ...(ip ? [[fingerprint(ip), 10]] : [])]) {
    const entry = attempts.get(key) || { count: 0, expires: now + WINDOW_MS };
    if (entry.count >= limit || (!attempts.has(key) && attempts.size >= MAX_ENTRIES)) {
      throw new FormError(429, "Too many requests. Please wait a minute and try again.");
    }
    entry.count++;
    attempts.set(key, entry);
  }
}

export async function readFormJson(request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    throw new FormError(415, "Please send a JSON request.");
  }
  const reader = request.body?.getReader();
  if (!reader) throw new FormError(400, "Invalid request.");
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) {
        await reader.cancel();
        throw new FormError(413, "Request is too large.");
      }
      chunks.push(Buffer.from(value));
    }
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
    return body;
  } catch (error) {
    if (error instanceof FormError) throw error;
    throw new FormError(400, "Invalid request. Please try again.");
  } finally { reader.releaseLock(); }
}

export function textField(value, name, max, required = false) {
  if (value == null && !required) return "";
  if (typeof value !== "string" || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) {
    throw new FormError(400, `Please check your ${name}.`);
  }
  const result = value.trim();
  if (required && !result) throw new FormError(400, `Please enter your ${name}.`);
  return result;
}

export function reserveSubmission(key) {
  const now = Date.now();
  prune(submissions, now);
  if (submissions.has(key)) throw new FormError(409, "This request was already submitted or is being processed. Please contact us before submitting again.");
  if (submissions.size >= MAX_ENTRIES) throw new FormError(503, "The form is busy. Please try again shortly.");
  submissions.set(key, { expires: now + 5 * WINDOW_MS });
  return () => submissions.delete(key);
}

export async function verifyCaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) throw new FormError(503, "Verification is unavailable. Please contact us directly.");
  if (!textField(token, "verification", 4096, true)) return;
  let response, result;
  try {
    response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST", cache: "no-store", signal: AbortSignal.timeout(10_000),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }).toString(),
    });
    result = await response.json();
  } catch { throw new FormError(502, "Verification could not connect. Please try again."); }
  if (!response.ok || typeof result?.success !== "boolean") throw new FormError(502, "Verification is temporarily unavailable.");
  if (!result.success) {
    if (Array.isArray(result["error-codes"]) && result["error-codes"].some(code => ["invalid-input-secret", "missing-input-secret"].includes(code))) {
      throw new FormError(503, "Verification is unavailable. Please contact us directly.");
    }
    throw new FormError(400, "Verification failed or expired. Please verify again.");
  }
  const hosts = (process.env.RECAPTCHA_ALLOWED_HOSTNAMES || "").split(",").map(x => x.trim().toLowerCase()).filter(Boolean);
  if (hosts.length && !hosts.includes(String(result.hostname).toLowerCase())) throw new FormError(400, "Verification is not valid for this website.");
}
