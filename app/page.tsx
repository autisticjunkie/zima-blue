import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Enter the website',
}

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#2A2A2A]">
      <Link
        href="/loading"
        className="text-4xl md:text-6xl text-[#5BC2E7] hover:text-[#4BA2C7] transition-colors px-8 py-4 border-2 border-[#5BC2E7] hover:border-[#4BA2C7]"
      >
        ENTER
      </Link>
    </main>
  )
}

