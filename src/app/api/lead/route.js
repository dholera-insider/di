export const runtime = "nodejs";

const TELECRM_URL =
  "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead";

function reply(status, body) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// Covers both response headers and the response body.
async function requestText(url, options, timeoutMs) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      cache: "no-store",
      signal: controller.signal,
    });

    return {
      ok: response.ok,
      status: response.status,
      text: await response.text(),
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request) {
  if (
    !request.headers
      .get("content-type")
      ?.includes("application/json")
  ) {
    return reply(415, {
      success: false,
      message: "Please send a JSON request.",
    });
  }

  let body;

  try {
    const text = await request.text();

    if (text.length > 16384) {
      return reply(413, {
        success: false,
        message: "Request is too large.",
      });
    }

    body = JSON.parse(text);
  } catch {
    return reply(400, {
      success: false,
      message: "Invalid request. Please try again.",
    });
  }

  const fullName =
    typeof body?.fullName === "string"
      ? body.fullName.trim()
      : "";

  const phone =
    typeof body?.phone === "string"
      ? body.phone.trim()
      : "";

  const token =
    typeof body?.recaptchaToken === "string"
      ? body.recaptchaToken.trim()
      : "";

  if (!fullName || !phone) {
    return reply(400, {
      success: false,
      message: "Please fill in all fields",
    });
  }

  if (fullName.length > 200 || phone.length > 64) {
    return reply(400, {
      success: false,
      message: "Please check your name and phone number.",
    });
  }

  if (!token) {
    return reply(400, {
      success: false,
      message: "Please complete the verification.",
    });
  }

  const apiKey = process.env.TELECRM_API_KEY;
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!apiKey || !secret) {
    console.error(
      "Lead form server configuration is incomplete.",
    );

    return reply(503, {
      success: false,
      message:
        "The form is temporarily unavailable. Please contact us directly.",
    });
  }

  let stage = "verification";

  try {
    // Verify the CAPTCHA before contacting TeleCRM.
    const verification = await requestText(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        body: new URLSearchParams({
          secret,
          response: token,
        }).toString(),
      },
      10000,
    );

    const captcha = parseJson(verification.text);

    if (
      !verification.ok ||
      typeof captcha?.success !== "boolean"
    ) {
      return reply(502, {
        success: false,
        message:
          "Verification is temporarily unavailable. Please try again.",
      });
    }

    if (!captcha.success) {
      const codes = Array.isArray(captcha["error-codes"])
        ? captcha["error-codes"]
        : [];

      if (
        codes.includes("invalid-input-secret") ||
        codes.includes("missing-input-secret")
      ) {
        console.error(
          "Lead form reCAPTCHA secret is invalid or missing.",
        );

        return reply(503, {
          success: false,
          message:
            "Verification is not configured correctly. Please contact us directly.",
        });
      }

      return reply(400, {
        success: false,
        message:
          "Verification failed or expired. Please verify again.",
      });
    }

    // Optional additional hostname check.
    const allowedHosts = (
      process.env.RECAPTCHA_ALLOWED_HOSTNAMES || ""
    )
      .split(",")
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean);

    if (
      allowedHosts.length &&
      !allowedHosts.includes(
        String(captcha.hostname || "").toLowerCase(),
      )
    ) {
      return reply(400, {
        success: false,
        message:
          "Verification is not valid for this website.",
      });
    }

    stage = "crm";

    const crm = await requestText(
      TELECRM_URL,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },

        // Exact field mapping, source and tags from the reference.
        body: JSON.stringify({
          fields: {
            name: fullName,
            phone,
            source: "Dholera Insider",
          },

          source: "Dholera Insider Website",

          tags: [
            "Dholera Investment",
            "Website Lead",
          ],
        }),
      },
      15000,
    );

    if (!crm.ok) {
      console.error(
        "TeleCRM rejected the lead request. HTTP status:",
        crm.status,
      );

      const detail = parseJson(crm.text);

      const message =
        typeof detail?.message === "string" &&
        detail.message
          ? detail.message.slice(0, 300)
          : "Unable to submit your request right now. Please contact us directly.";

      return reply(
        crm.status === 429 ? 429 : 502,
        {
          success: false,
          message,
        },
      );
    }

    // Preserve the reference's HTTP-success criterion.
    // Do not assume an undocumented TeleCRM response schema.
    return reply(200, {
      success: true,
      message:
        "Your request has been submitted successfully.",
    });
  } catch (error) {
    console.error(
      "Lead request failed during:",
      stage,
      "Error:",
      error.name,
    );

    return reply(
      error.name === "AbortError" ? 504 : 502,
      {
        success: false,

        message:
          stage === "crm"
            ? "We could not confirm your submission. Please contact us before submitting again."
            : "Verification could not connect. Please try again.",
      },
    );
  }
}