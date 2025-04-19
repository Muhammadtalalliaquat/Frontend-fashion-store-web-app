"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createOrder } from "../../store/features/orderSlice";
import Navbar from "../../compoments/navbar";
import { useDispatch } from "react-redux";
import Image from "next/image";

export default function PlaceOrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const discountPrice = searchParams.get("discountPrice");
  const quantity = searchParams.get("quantity");
  const image = searchParams.get("image");
  const productId = searchParams.get("productId");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const dispatch = useDispatch();

  const handleAddOrder = () => {
    const orderFormData = {
      country,
      city,
      area,
      productId,
      quantity,
    };

    console.log("Sending Order Data:", orderFormData);

    dispatch(createOrder(orderFormData))
      .then((result) => {
        console.log("API Response:", result.payload);
        router.push("/ordersPage");
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      });
  };

  return (
    <>
      <Navbar />
      {/* <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10"> */}
      <div className="max-w-4xl mx-auto p-6 mt-18 sm:mt-20 md:mt-32 lg:mt-40 bg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Place Your Order
        </h2>

        <div className="flex flex-wrap justify-between gap-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex-1 flex flex-col items-center justify-center sm:items-start sm:justify-start">
            <Image
              src={image}
              alt={name}
              width={150}
              height={150}
              className="rounded-lg object-cover mb-4"
            />
            <h3 className="text-xl font-medium text-gray-800">
              Product: {name}
            </h3>
            {/* <p className="text-lg font-medium text-gray-600">Price: ${price}</p> */}
            {discountPrice ? (
              <p className="font-medium text-gray-600">
                Price:{" "}
                <span className="line-through mr-2 text-gray-400">
                  ${price}
                </span>
                <span className="text-blue-600 font-semibold">
                  ${discountPrice}
                </span>
              </p>
            ) : (
              <>
                <p className="text-lg font-medium text-gray-600">
                  Price: ${price}
                </p>
                <p className="text-lg font-medium text-gray-600">
                  Qty: {quantity}
                </p>
              </>
            )}
          </div>

          <div className="flex-1 flex flex-col">
            <div className="mb-6">
              <label className="block text-sm text-gray-700 font-medium mb-2">
                Shipping Address
              </label>

              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <input
                type="text"
                placeholder="Area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="text-center mt-6">
              <button
                onClick={handleAddOrder}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
