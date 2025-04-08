"use client";

import Navbar from "../../compoments/navbar";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../store/features/productSlice";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllProducts())
      .then((result) => {
        console.log("API Response:", result.payload);
        setProducts(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err, error);
        setError("Failed to load products.");
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-between w-full bg-gradient-to-b from-blue-900 to-blue-700 p-10 mt-18 shadow-lg flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 text-left text-white p-10">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Discover and Find Your Own Fashion
          </h1>
          <p className="mt-4 text-lg">
            Stay tuned! New arrivals are coming soon.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-black text-lg rounded-lg hover:bg-gray-300">
            Explore More
          </button>
        </div>

        <div className="w-full sm:w-1/2 flex justify-center sm:justify-end pr-10 mt-6 sm:mt-0">
          <Image
            src="/product-image.png"
            alt="Fashion"
            className="w-[80%] rounded-lg drop-shadow-xl"
            width={500}
            height={500}
          />
        </div>
      </div>

      <div className="p-6 mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Products
        </h2>

        {loading ? (
          <div className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-75">
            <FaSpinner className="animate-spin text-5xl text-blue-500" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center text-center 
          transition-transform duration-300 hover:scale-98 hover:shadow-xl border border-gray-200 group relative"
              >
                <span
                  className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full text-white z-10 shadow-md
                  ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}
                `}
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}
                </span>

                <div className="relative opacity-100 group-hover:opacity-60 w-44 h-44 overflow-hidden rounded-lg border-b-2 border-gray-300 pb-2">
                  <Image
                    src={product.image}
                    alt="Product"
                    width={176}
                    height={176}
                    className="object-cover w-full h-full rounded-lg transition-all duration-300"
                    priority
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mt-1">
                  {product.name}
                </h3>

                <p className="text-gray-700 text-sm mt-3 font-semibold">
                  ${product.price}
                </p>

                <button
                  className="absolute bottom-2 right-2 text-white font-semibold opacity-40 sm:opacity-0 sm:group-hover:opacity-40 transition-all duration-300 
             ease-in-out bg-blue-500 bg-opacity-30 backdrop-blur-lg px-4 py-2 rounded-md w-32 
             transform translate-x-0 sm:translate-x-4 sm:group-hover:translate-x-0"
                  onClick={() => {
                    const queryString = new URLSearchParams({
                      productId: product._id,
                      name: product.name,
                      price: product.price.toString(),
                      category: product.category,
                      stock: product.stock.toString(),
                      description: product.description,
                      image: product.image,
                    }).toString();

                    router.push(`/productDetails?${queryString}`);
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
}
