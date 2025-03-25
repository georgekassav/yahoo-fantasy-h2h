import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  try {
    const tokenUrl = "https://api.login.yahoo.com/oauth2/get_token";

    const params = new URLSearchParams({
      client_id: process.env.YAHOO_CLIENT_ID ?? "",
      client_secret: process.env.YAHOO_CLIENT_SECRET ?? "",
      redirect_uri: process.env.YAHOO_REDIRECT_URI ?? "",
      grant_type: "authorization_code",
      code,
    });

    const authHeader = `Basic ${Buffer.from(
      `${process.env.YAHOO_CLIENT_ID}:${process.env.YAHOO_CLIENT_SECRET}`
    ).toString("base64")}`;

    const { data } = await axios.post(tokenUrl, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authHeader,
      },
    });

    const FRONTEND_BASE_URL =
      process.env.FRONTEND_BASE_URL || "http://localhost:3000";
    const redirectUrl = `${FRONTEND_BASE_URL}/dashboard`;

    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set("yahoo_access_token", data.access_token, {
      httpOnly: true,
      secure: true,
      maxAge: data.expires_in,
    });

    response.cookies.set("yahoo_refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: true,
    });

    return response;
  } catch (error) {
    console.error(
      "Token exchange failed:",
      axios.isAxiosError(error) ? error.response?.data || error.message : error
    );

    return NextResponse.json(
      { error: "Failed to exchange token" },
      { status: 500 }
    );
  }
}
