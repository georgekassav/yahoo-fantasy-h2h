import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";
import _ from "lodash";

export async function GET(req: NextRequest) {
  const access_token = req.cookies.get("yahoo_access_token");
  const refresh_token = req.cookies.get("yahoo_refresh_token");

  if (!access_token || !refresh_token) {
    return NextResponse.json({
      status: 401,
      error: { error: "Unauthorized" },
    });
  }

  const url = "https://fantasysports.yahooapis.com/fantasy/v2";
  const response = await axios.get(`${url}/users;use_login=1/games/teams`, {
    headers: {
      Authorization: `Bearer ${access_token.value}`,
      Accept: "*/*",
    },
  });

  const jsonData = await parseStringPromise(response.data, {
    explicitArray: false,
  });

  const formattedData = _.get(
    jsonData,
    "fantasy_content.users.user.games.game",
    []
  );

  return NextResponse.json({
    status: response.status,
    data: formattedData,
  });
}
