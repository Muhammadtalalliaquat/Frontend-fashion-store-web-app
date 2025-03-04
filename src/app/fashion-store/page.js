"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../store/features/productSlice";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("image", image);

    dispatch(createProduct(formData));

    router.push("/home");
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded bg-gray-50"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}
