import Link from "next/link"

export function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4">
      <div className="container mx-auto">
        <Link href="/" className="text-2xl font-bold">
          Payment Integrity System
        </Link>
      </div>
    </header>
  )
}
