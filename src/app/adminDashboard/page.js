"use client";

import Navbar from "../../compoments/navbar";
import withAdminCheck from "../../HOC/withAuth";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../store/features/productSlice";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";

function AdminDashboard() {
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

      <div className="flex items-center justify-between w-full bg-gradient-to-b from-blue-900 to-blue-700 p-10 mt-17 shadow-lg flex-col sm:flex-row">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center text-center 
          transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 group relative"
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
                  {/* <div className="absolute inset-0 bg-gray-500 opacity-50 transition-opacity duration-300 group-hover:opacity-0"></div> */}
                  <Image
                    src={product.image}
                    alt="Product"
                    width={176}
                    height={176}
                    className="object-cover w-full h-full rounded-lg transition-all duration-300"
                    priority
                  />
                </div>

                <p className="text-gray-700 text-sm mt-3 font-semibold">
                  ${product.price}
                </p>
                {/* <div className="flex items-center space-x-1 text-yellow-400 mt-1">
                  {Array.from({ length: Math.round(product.rating || 4) }).map(
                    (_, index) => (
                      <FaStar key={index} />
                    )
                  )}
                </div> */}

                {/* Product Name */}
                <h3 className="text-lg font-semibold text-gray-800 mt-1">
                  {product.name}
                </h3>

                <button
                  // className="mt-4 text-blue-100 font-semibold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300
                  //           `bg-black bg-opacity-20 px-4 py-2 rounded-md w-full"

                  className="mt-4 text-blue-100 font-semibold opacity-20 sm:opacity-0 group-hover:opacity-20 transition-opacity duration-300 
                    bg-black bg-opacity-20 px-4 py-2 rounded-md w-full"
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

export default withAdminCheck(AdminDashboard);
