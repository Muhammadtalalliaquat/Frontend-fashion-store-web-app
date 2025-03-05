"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../store/features/productSlice";
// import Image from "next/image";

export default function ProductList() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus("loading");
    dispatch(getAllProducts())
      .then((result) => {
        console.log("API Response:", result.payload);
        setProducts(result.payload.data);
        setStatus("success");
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("Failed to load products.");
        setStatus("failed");
      });
  }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(removeProduct(id));
//     setProducts((prev) => prev.filter((product) => product._id !== id));
//   };

  return (
    <div className="p-6 mt-16">
      <h2 className="text-3xl font-bold mb-6">Products</h2>
      {status === "loading" && <p>Loading products...</p>}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
            >
              <div className="relative w-40 h-40 mb-4">
                {/* <Image
                  src={`https://back-end-fashion-web-app-server-production.up.railway.app/${product.image}`}
                  alt={product.name} 
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                  priority
                /> */}
              </div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-gray-600">Stock: {product.stock}</p>
              {/* <button
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button> */}
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}
