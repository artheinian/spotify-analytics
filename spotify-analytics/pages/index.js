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

      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-2xl font-bold">Please sign in</h1>
        <a
          href="/api/auth/login"
          className="rounded-lg bg-green-500 px-4 py-2 text-white"
        >
          Connect to Spotify
        </a>
      </div>
    </main>

  );
}

