import {
  FormError, fingerprint, guardRequest, readFormJson,
  reserveSubmission, textField, verifyCaptcha,
} from "../../../lib/form-security";

export const runtime = "nodejs";
const TELECRM_URL = "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead";
const allowedTags = new Set(["Dholera Investment", "Website Lead", "BookMyAssets", "Popup Lead", "Dholera Insider", "Contact Form"]);

function reply(status, body) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "60" } : {}) },
  });
}

export async function POST(request) {
  let crmStarted = false;
  try {
    guardRequest(request);
    const body = await readFormJson(request);
    const input = body.fields ?? { name: body.fullName, phone: body.phone };
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new FormError(400, "Invalid form fields.");
    const fields = {
      name: textField(input.name, "name", 200, true),
      phone: textField(input.phone, "phone number", 16, true),
      source: textField(input.source ?? "Dholera Insider", "source", 200),
    };
    if (!/^\+[1-9]\d{7,14}$/.test(fields.phone)) throw new FormError(400, "Please enter a valid international phone number.");
    for (const [key, max] of [["email", 254], ["country", 100], ["message", 4000], ["interestedIn", 200]]) {
      if (input[key] !== undefined) fields[key] = textField(input[key], key, max);
    }
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) throw new FormError(400, "Please enter a valid email address.");
    const token = textField(body.recaptchaToken, "verification", 4096, true);
    const source = textField(body.source ?? "Dholera Insider Website", "source", 200);
    const tags = body.tags ?? ["Dholera Investment", "Website Lead"];
    if (!Array.isArray(tags) || tags.length > 6 || tags.some(tag => !allowedTags.has(tag))) throw new FormError(400, "Invalid form tags.");

    // Transitional server-only fallback: rename the deployment variable and rotate this credential.
    const apiKey = process.env.TELECRM_API_KEY || process.env.NEXT_PUBLIC_TELECRM_API_KEY;
    if (!apiKey) throw new FormError(503, "The form is temporarily unavailable. Please contact us directly.");
    await verifyCaptcha(token);
    // Reserve synchronously before the CRM call, including concurrent requests from different forms.
    reserveSubmission(`lead:${fingerprint(fields.phone)}`);
    crmStarted = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    let crm;
    try {
      crm = await fetch(TELECRM_URL, {
        method: "POST", cache: "no-store", signal: controller.signal,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ fields, source, tags }),
      });
      // Consume the body under the same timeout; never expose upstream diagnostics.
      await crm.text();
    } finally { clearTimeout(timeout); }
    if (!crm.ok) {
      console.error("TeleCRM rejected a lead. HTTP status:", crm.status);
      throw new FormError(crm.status === 429 ? 429 : 502, "We could not confirm your submission. Please contact us before submitting again.");
    }
    return reply(200, { success: true, message: "Your request has been submitted successfully." });
  } catch (error) {
    // Retain reservations after sending: an upstream timeout/error may still have created a lead.
    if (error instanceof FormError) return reply(error.status, { success: false, message: error.message });
    console.error("Lead request failed:", error?.name || "UnknownError");
    return reply(error?.name === "AbortError" ? 504 : 502, {
      success: false,
      message: crmStarted
        ? "We could not confirm your submission. Please contact us before submitting again."
        : "Unable to submit your request. Please try again.",
    });
  }
}
