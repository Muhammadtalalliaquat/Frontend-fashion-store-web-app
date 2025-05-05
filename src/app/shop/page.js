"use client";

import Navbar from "../../compoments/navbar";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getAllDiscountOffer } from "../../store/features/discountSlice";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { FaSpinner } from "react-icons/fa";
import "animate.css";

export default function ShopPage() {
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDiscountOffer())
      .then((result) => {
        console.log("API Response:", result.payload);
        setDiscount(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err, error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <Navbar />

      {loading && (
        <div className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-75">
          <FaSpinner className="animate-spin text-5xl text-blue-500" />
        </div>
      )}

      <div className="container mx-auto p-4 mt-20">
        <div className="bg-blue-500 text-white p-8 text-center mb-8 rounded-xl shadow-md animate__animated animate__fadeInDown">
          <h1 className="text-3xl font-bold mb-2">Popular Gift Collections</h1>
          <p className="text-lg">Select your favorite product now on sale</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className=" p-4 space-y-3">
              <h2 className="text-xl font-semibold mb-2">Filters</h2>
              <button className="w-full bg-blue-100 text-black px-4 py-2 rounded-lg hover:bg-blue-200 transition">
                All
              </button>
              <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                Men Watches
              </button>
              <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                Women Watches
              </button>
              <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                Jewellery
              </button>
            </div>
          </div>

          {!loading &&
            (discount.length > 0 ? (
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {discount.map((item) => (
                  <div
                    key={item._id}
                    className="group rounded-xl p-6 shadow hover:shadow-lg transition duration-300 border border-gray-200 hover:border-blue-500"
                  >
                    <Image
                      width={500}
                      height={500}
                      src={item.image}
                      alt={item.image}
                      className="w-full h-60 object-cover rounded-lg mb-4"
                    />

                    <h3 className="text-lg font-semibold mb-1">
                      {item.productName}
                    </h3>
                    <h3 className="text-lg font-semibold mb-1">
                      {item.productName}
                    </h3>

                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-500">{item.SalesCategory}</p>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-100 hover:bg-blue-200 p-2 rounded-full shadow-md cursor-pointer">
                        <LiaShoppingCartSolid
                          size={20}
                          className="text-blue-600"
                        />
                      </button>
                    </div>

                    <p className="flex justify-between items-center mb-2">
                      <span className="text-blue-600 font-bold mb-1">
                        ${item.discountPrice}
                      </span>
                      <span className="line-through text-gray-400 ml-2">
                        ${item.price}
                      </span>
                    </p>
                    <p className="text-green-600 text-sm mb-1">
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.offerTitle}
                    </p>
                    <button className="bg-blue-500 text-white w-full py-2 rounded-full hover:bg-blue-600">
                      Gift Now
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No discounts available</p>
            ))}
        </div>
      </div>
    </>
  );
}
