import { parse, serialize } from "cookie";

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || "");
  const refreshToken = cookies.spotify_refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ error: "Missing refresh token" });
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const data = await tokenRes.json();

  if (!tokenRes.ok) {
    return res.status(500).json({ error: "Refresh failed", details: data });
  }

  const { access_token, expires_in } = data;

  res.setHeader(
    "Set-Cookie",
    serialize("spotify_access_token", access_token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in,
    })
  );

  res.status(200).json({ ok: true });
}
