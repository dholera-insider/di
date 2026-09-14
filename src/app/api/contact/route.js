import { client } from "@/sanity/lib/client";
import { FormError, fingerprint, guardRequest, readFormJson, textField, verifyCaptcha } from "../../../lib/form-security";

export async function POST(request) {
  const headers = { "Cache-Control": "no-store" };
  try {
    guardRequest(request);
    const body = await readFormJson(request);
    const fields = {
      name: textField(body.name, "name", 200, true),
      email: textField(body.email, "email", 254, true),
      subject: textField(body.subject, "subject", 200, true),
      message: textField(body.message, "message", 4000, true),
    };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) throw new FormError(400, "Please enter a valid email address.");
    const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
    if (!token) throw new FormError(503, "The form is temporarily unavailable. Please contact us directly.");
    await verifyCaptcha(body.recaptchaToken);
    const now = new Date().toISOString();
    // Deduplicate identical enquiries across workers within a UTC day; allow later follow-ups.
    const id = `contact.${fingerprint(`${now.slice(0, 10)}:${JSON.stringify(fields)}`)}`;
    const result = await client.withConfig({ token, useCdn: false, timeout: 15_000, maxRetries: 0 }).createIfNotExists({
      _id: id, _type: "contact", ...fields,
      status: "pending", statusUpdateDate: now,
      statusNotes: "New submission", submittedAt: now,
    });
    return Response.json({ success: true, message: "Form submitted successfully", id: result._id }, { headers });
  } catch (error) {
    const status = error instanceof FormError ? error.status : 502;
    if (status === 429) headers["Retry-After"] = "60";
    if (!(error instanceof FormError)) console.error("Contact submission failed:", error?.name || "UnknownError");
    return Response.json({
      success: false,
      message: error instanceof FormError ? error.message : "We could not confirm your submission. Please contact us before submitting again.",
    }, { status, headers });
  }
}
