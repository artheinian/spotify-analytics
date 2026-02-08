"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SideBar() {
    const pathname = usePathname()

    const linkClass = (path) =>
        `rounded px-3 py-2 ${pathname === path ? "font-semibold " : "hover:bg-gray-100 hover:text-black"
        }`

    return (
        <aside className="w-64 border-r p-4">
            <div className="mb-6 text-xl font-bold">Spotify Analytics</div>

            <nav className="flex flex-col gap-2">
                <Link className={linkClass("/dashboard")} href="/dashboard">Dashboard</Link>
                <Link className={linkClass("/playlists")} href="/playlists">Playlists</Link>
                <Link className={linkClass("/settings")} href="/settings">Settings</Link>
            </nav>
        </aside>
    )
}
