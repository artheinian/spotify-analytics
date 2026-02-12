import { useEffect, useState } from "react"

export default function AuthGuard({ children }) {
    const [loading, setLoading] = useState(true)
    const [notLoggedIn, setNotLoggedIn] = useState(false)

    useEffect(() => {
        fetch("/api/spotify/user")
            .then((res) => {
                if (res.status === 401) {
                    setNotLoggedIn(true)
                    return null
                }
                return res.json()
            })
            .then(() => {
        
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p className="p-6">Loading...</p>

    if (notLoggedIn) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-6">
                <h1 className="text-2xl font-bold">Please sign in</h1>
                <a
                    href="/api/auth/login"
                    className="rounded-lg bg-green-500 px-4 py-2 text-white"
                >
                    Login with Spotify
                </a>
            </div>
        )
    }

    return children
}
