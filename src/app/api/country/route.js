import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const country =
    request.headers.get("x-country-code")?.toLowerCase() || "in";

  return NextResponse.json(
    { country: /^[a-z]{2}$/.test(country) ? country : "in" },
    {
      headers: {
        "Cache-Control": "private, no-store",
      },
    }
  );
}
