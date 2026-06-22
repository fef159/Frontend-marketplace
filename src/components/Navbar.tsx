import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        Mini Marketplace
      </Link>

      <div className="flex gap-6">
        <Link href="/" className="hover:text-blue-300">
          Inicio
        </Link>

        <Link href="/admin" className="hover:text-blue-300">
          Admin
        </Link>
      </div>
    </nav>
  );
}