import { NextResponse } from "next/server";

export async function GET() {
  const yahooAuthUrl = "https://api.login.yahoo.com/oauth2/request_auth";

  const params = new URLSearchParams({
    client_id:
      process.env.YAHOO_CLIENT_ID ||
      "dj0yJmk9T01xaVp2Uk5lc09uJmQ9WVdrOU1uRmFSemd6UjNNbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWQ4",
    redirect_uri:
      process.env.YAHOO_REDIRECT_URI ||
      "localhost:3000/api/auth/yahoo/callback",
    response_type: "code", // Required
    scope: "fspt-r", // Modify scope as per Yahoo API documentation
  });

  return NextResponse.redirect(`${yahooAuthUrl}?${params.toString()}`);
}
