export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Spotify Analytics</h1>
      <p>Connect your Spotify account to view your stats.</p>

      <a href="/api/auth/login">
        <button style={{ padding: "10px 14px", cursor: "pointer" }}>
          Connect Spotify
        </button>
      </a>
    </main>
  );
}
