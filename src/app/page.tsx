import Link from "next/link";
import { Product } from "@/types/product";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3001/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <section>
      <h1 className="text-4xl font-bold mb-6">Productos disponibles</h1>

      {products.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-6 border"
            >
              <h2 className="text-xl font-bold mb-2">{product.nombre}</h2>

              <p className="text-gray-600 mb-3">{product.descripcion}</p>

              <p className="text-2xl font-bold text-green-600 mb-4">
                S/ {Number(product.precio).toFixed(2)}
              </p>

              <Link
                href={`/products/${product.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Ver detalle
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}