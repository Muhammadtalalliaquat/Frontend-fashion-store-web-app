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

  const siteDetails = [
    {
      title: "Premium Quality",
      description: "Top-grade materials for unmatched style and durability.",
      icon: "✔",
    },
    {
      title: "Fast Delivery",
      description: "Quick and secure delivery at your doorstep.",
      icon: "🚚",
    },
    {
      title: "24/7 Support",
      description: "We’re here to help anytime, any day.",
      icon: "📞",
    },
    {
      title: "Trusted by Thousands",
      description: "Thousands of happy customers around the world.",
      icon: "🌍",
    },
  ];

 

  return (
    <>
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
          Our Products
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

        <section className="bg-gray-100 px-4 py-16">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              About Our Store
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              At{" "}
              <span className="font-semibold text-gray-800">EleganceWear</span>,
              we bring you high-quality fashion for every occasion. From jewelry
              to premium watches, we mix elegance with comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {siteDetails.map((item, idx) => (
              <div
                key={idx}
                className="relative group p-6 shadow-md overflow-hidden bg-white transition-colors duration-300"
              >
                {/* Background fill layer */}
                <div className="absolute inset-0 bg-blue-100 origin-top-left scale-0 group-hover:scale-100 transition-transform duration-300 ease-out z-0" />

                {/* Card content */}
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* <div className=" py-12 mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Why Shop With Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl text-blue-500 mb-4">{feature.icon}</div>
              <h3 className="font-bold text-xl">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}
