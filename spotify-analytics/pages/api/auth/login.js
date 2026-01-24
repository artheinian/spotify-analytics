import crypto from "crypto";

export default function handler(req, res) {
  const state = crypto.randomBytes(16).toString("hex");

  // store state in a short-lived cookie (helps prevent CSRF)
  res.setHeader("Set-Cookie", [
    `spotify_auth_state=${state}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax`,
  ]);

  const scope = [
    "user-read-email",
    "user-read-private",
    "user-top-read",
    "user-read-recently-played",
    "playlist-read-private",
  ].join(" ");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    state,
    show_dialog: "true",
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);

  console.log("REDIRECT:", process.env.SPOTIFY_REDIRECT_URI);
}


