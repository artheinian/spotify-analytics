import { parse } from "cookie";

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.spotify_access_token;

  if (!accessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const spotifyRes = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!spotifyRes.ok) {
    return res.status(spotifyRes.status).json({ error: "Spotify API error" });
  }

  const data = await spotifyRes.json();
  res.status(200).json(data);
}
