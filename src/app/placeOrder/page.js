"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createOrder } from "../../store/features/orderSlice";
import { getAllReview } from "../../store/features/productReviewSlice";
import Navbar from "../../compoments/navbar";
import { useDispatch } from "react-redux";
import Image from "next/image";

export default function PlaceOrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const quantity = searchParams.get("quantity");
  const image = searchParams.get("image");
  const productId = searchParams.get("productId");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [posterCode, setPostercode] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    const storedItems = localStorage.getItem("orderItems");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      console.log(parsedItems);
    }
  }, []);

  

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(""), 3000);
      return () => clearTimeout(timer);
    }

    dispatch(getAllReview(productId))
      .then((result) => {
        console.log("API Response:", result.payload);
        setReviews(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err, error);
        setLoading(false);
      });
  }, [dispatch, errorMsg, productId]);

  const handleOrderPlacement = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderFormData = {
      email,
      firstName,
      lastName,
      city,
      posterCode,
      phone,
      address,
      productId,
      quantity,
    };

    console.log("Sending Order Data:", orderFormData);

    dispatch(createOrder(orderFormData))
      .then((result) => {
        // console.log("API Response:", result.payload);
        const message = result.payload?.msg;
        if (message) {
          setErrorMsg(message);
          if (message.toLowerCase().includes("placed")) {
            router.push("/ordersPage");
          }
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 md:p-10  rounded-lg  grid grid-cols-1 lg:grid-cols-3 gap-10 mt-20">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

          <form onSubmit={handleOrderPlacement}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              required
            />

            <h2 className="text-lg font-semibold mb-6">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="First name"
                className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <input
              type="text"
              placeholder="Address"
              className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="City"
                className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Poster-code"
                className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={posterCode}
                onChange={(e) => setPostercode(e.target.value)}
                required
              />
            </div>
            <input
              type="text"
              placeholder="Phone"
              className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition"
            >
              {isSubmitting ? (
                <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
              ) : (
                "Place order"
              )}
            </button>
          </form>
          {errorMsg && (
            <p
              className={`fixed top-[110px] left-1/2 transform -translate-x-1/2 ${
                errorMsg.toLowerCase().includes("success") ||
                errorMsg.toLowerCase().includes("placed")
                  ? "bg-green-500"
                  : "bg-red-500"
              } text-white px-4 py-2 rounded shadow-lg transition-all duration-500 ${
                errorMsg
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {errorMsg}
            </p>
          )}
        </div>

        <div className="border border-gray-200 rounded p-6 bg-gray-50">
          <div className="flex items-center mb-4">
            <Image
              src={image}
              alt={name}
              width={80}
              height={80}
              className="rounded mr-4"
            />
            <div>
              <h3 className="text-sm font-semibold">{name}</h3>
              <p className="text-sm text-gray-500">Qty: {quantity}</p>
            </div>
          </div>

          <div className="text-sm mb-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${price}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$5</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${quantity * price}</span>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>30-day risk-free trial & easy returns</span>
            </div>
            {loading ? (
              <p>Loading reviews...</p>
            ) : (
              <div className="flex items-center bg-orange-100 p-1">
                <span className="mr-2">⭐</span>
                <span>Total reviews ({reviews.length})</span>
              </div>
            )}

            <div className="flex items-center">
              <span className="mr-2">🚚</span>
              <span>Free fast shipping Pakistan</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
