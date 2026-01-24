import { serialize, parse } from "cookie";

export default async function handler(req, res) {
  const { code, state } = req.query;
  const cookies = parse(req.headers.cookie || "");
  const savedState = cookies.spotify_auth_state;

  if (!state || !savedState || state !== savedState) {
    return res.status(400).send("State mismatch. Try logging in again.");
  }

  if (!code) {
    return res.status(400).send("Missing code.");
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
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
    return res.status(500).json({ error: "Token exchange failed", details: data });
  }

  const { access_token, refresh_token, expires_in } = data;

  // Store tokens as httpOnly cookies
  res.setHeader("Set-Cookie", [
    serialize("spotify_access_token", access_token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in, // seconds
    }),
    serialize("spotify_refresh_token", refresh_token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    }),
    // clear state cookie
    serialize("spotify_auth_state", "", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
    }),
  ]);

  res.redirect("/dashboard");
}
