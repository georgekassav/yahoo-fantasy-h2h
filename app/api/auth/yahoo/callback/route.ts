import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new NextResponse("Missing authorization code", { status: 400 });
  }

  try {
    const tokenUrl = "https://api.login.yahoo.com/oauth2/get_token";

    const params = new URLSearchParams({
      client_id: process.env.YAHOO_CLIENT_ID || "",
      client_secret: process.env.YAHOO_CLIENT_SECRET || "",
      redirect_uri: process.env.YAHOO_REDIRECT_URI || "",
      grant_type: "authorization_code",
      code: code || "",
    });

    const authHeader = `Basic ${Buffer.from(
      `${process.env.YAHOO_CLIENT_ID}:${process.env.YAHOO_CLIENT_SECRET}`
    ).toString("base64")}`;

    const { data } = await axios.post(tokenUrl, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authHeader,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
    } else {
      console.error(error);
    }
    return new NextResponse("Failed to exchange token", { status: 500 });
  }
}
