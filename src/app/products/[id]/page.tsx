import Link from "next/link";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <section className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-4xl font-bold mb-4">{product.nombre}</h1>

      <p className="text-gray-700 mb-4">{product.descripcion}</p>

      <p className="text-3xl font-bold text-green-600 mb-6">
        S/ {Number(product.precio).toFixed(2)}
      </p>

      <Link
        href="/"
        className="inline-block bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
