"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  async function loadProducts() {
    const res = await fetch(`${API_URL}/api/products`);
    const data = await res.json();
    setProducts(data);
  }

  async function createProduct(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        precio: Number(precio),
        descripcion,
      }),
    });

    setNombre("");
    setPrecio("");
    setDescripcion("");
    loadProducts();
  }

  async function deleteProduct(id: number) {
    await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
    });

    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section>
      <h1 className="text-4xl font-bold mb-6">Administración de productos</h1>

      <form
        onSubmit={createProduct}
        className="bg-white p-6 rounded-xl shadow-md mb-8 grid gap-4 max-w-xl"
      >
        <h2 className="text-2xl font-bold">Registrar producto</h2>

        <input
          className="border p-3 rounded-lg"
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          className="border p-3 rounded-lg"
          type="number"
          step="0.01"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />

        <textarea
          className="border p-3 rounded-lg"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Guardar producto
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Lista de productos</h2>

        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{product.nombre}</h3>
                <p className="text-gray-600">{product.descripcion}</p>
                <p className="text-green-600 font-bold">
                  S/ {Number(product.precio).toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
