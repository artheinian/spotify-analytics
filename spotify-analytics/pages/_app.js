import "../styles/globals.css"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Sidebar from "../components/ui/Sidebar"

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      // If we're on the login/home page, don't require auth
      if (router.pathname === "/") {
        setIsAuthed(false)
        setAuthChecked(true)
        return
      }

      try {
        const res = await fetch("/api/spotify/user")
        if (res.status === 401) {
          setIsAuthed(false)
          setAuthChecked(true)
          router.replace("/") // send to login
          return
        }

        setIsAuthed(true)
        setAuthChecked(true)
      } catch {
        setIsAuthed(false)
        setAuthChecked(true)
        router.replace("/")
      }
    }

    checkAuth()
  }, [router.pathname])

  // While checking auth for protected pages, render nothing (prevents sidebar flash)
  if (!authChecked && router.pathname !== "/") return null

  const showSidebar = isAuthed && router.pathname !== "/"

  return (
    <div className={showSidebar ? "flex min-h-screen" : ""}>
      {showSidebar && <Sidebar />}
      <main className={showSidebar ? "flex-1 p-6" : ""}>
        <Component {...pageProps} />
      </main>
    </div>
  )
}
