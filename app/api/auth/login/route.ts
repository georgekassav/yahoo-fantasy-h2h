import { NextResponse } from "next/server";

export async function GET() {
  const yahooAuthUrl = "https://api.login.yahoo.com/oauth2/request_auth";

  const clientId = process.env.YAHOO_CLIENT_ID;
  const redirectUri = process.env.YAHOO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    throw new Error("Missing environment variables for Yahoo OAuth");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code", // Required
    scope: "fspt-r", // Modify scope as per Yahoo API documentation
  });

  return NextResponse.redirect(`${yahooAuthUrl}?${params.toString()}`);
}
