"use client";

import Navbar from "../../compoments/navbar";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllProductShow } from "../../store/features/productSlice";
import { FaSpinner } from "react-icons/fa";
import Image from "next/image";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function Products() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchAllProductShow())
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
  }, [dispatch]);

  const filteredProducts = products.filter(
    (product) =>
      (category === "all" || product.category === category) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { name: "All Categories", value: "all" },
    { name: "Jewelry", value: "Jewellery" },
    { name: "Men's & Women's Watches", value: "Watch" },
  ];

  return (
    <>
      <Navbar />
      <section className="px-6 py-10 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Listbox value={category} onChange={setCategory}>
              <div className="relative w-full sm:w-1/3">
                <Listbox.Button className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {categories.find((c) => c.value === category)?.name}
                  <ChevronDownIcon className="w-5 h-5 absolute right-3 top-3 text-gray-500" />
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg">
                  {categories.map((item, idx) => (
                    <Listbox.Option
                      key={idx}
                      value={item.value}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-2 ${
                          active ? "bg-blue-100 text-blue-800" : "text-gray-700"
                        }`
                      }
                    >
                      {item.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          {loading ? (
            <div className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-75">
              <FaSpinner className="animate-spin text-5xl text-blue-500" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  //   className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-50 transition-all duration-300 flex flex-col items-center text-center"
                  className="group relative bg-white rounded-xl shadow-md p-4 hover:bg-gray-50 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="w-full h-44 mb-4">
                    <Image
                      src={product.image}
                      alt="Product"
                      width={300}
                      height={176}
                      className="w-full h-full object-contain rounded-lg"
                      priority
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.name}
                  </h2>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                  <p className="text-blue-600 font-bold mt-1">
                    ${product.price}
                  </p>

                  <button
                    // className="absolute bottom-3 right-3 bg-blue-500 text-white px-4 py-2 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                    className="absolute bottom-3 right-3 bg-blue-500 text-white px-4 py-2 rounded-md text-sm 
                    opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300"
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
          )}
        </div>
      </section>
    </>
  );
}
