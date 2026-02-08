import "@/styles/globals.css";
import Sidebar from "../components/ui/Sidebar"

export default function App({ Component, pageProps }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
