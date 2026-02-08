"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import DashboardIcon from "@mui/icons-material/Dashboard"
import QueueMusicIcon from "@mui/icons-material/QueueMusic"
import SettingsIcon from "@mui/icons-material/Settings"

export default function SideBar() {
    const pathname = usePathname()

    const linkClass = (path) =>
        `flex items-center gap-3 rounded px-3 py-2 transition-colors ${pathname === path
            ? "bg-gray-200 font-semibold text-black"
            : "text-gray-600 hover:bg-gray-100 hover:text-black"
        }`

    return (
        <aside className="w-64 border-r p-4">
            <div className="mb-6 text-xl font-bold">Spotify Analytics</div>

            <nav className="flex flex-col gap-2">
                <Link href="/dashboard" className={linkClass("/dashboard")}>
                    <DashboardIcon fontSize="small" />
                    Dashboard
                </Link>

                <Link href="/playlists" className={linkClass("/playlists")}>
                    <QueueMusicIcon fontSize="small" />
                    Playlists
                </Link>

                <Link href="/settings" className={linkClass("/settings")}>
                    <SettingsIcon fontSize="small" />
                    Settings
                </Link>
            </nav>
        </aside>
    )
}
