"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllCart,
  removeCartItem,
  updateProductCart,
} from "../../store/features/productCartSlice";
import Image from "next/image";
import Navbar from "../../compoments/navbar";
import {
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import { FaSpinner } from "react-icons/fa";

export default function ProductCartPage() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [carts, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllCart())
      .then((result) => {
        console.log("API Response:", result.payload);
        setCart(result.payload.data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products cart items.");
        console.error("Fetch Error:", err, error);
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleRemoveItem = (id) => {
    console.log("Removing cart item with ID:", id);

    if (!id || typeof id !== "string") {
      console.error("Invalid ID type:", id);
      return;
    }
    setCart((prev) => prev.filter((item) => item.productId._id !== id));

    dispatch(removeCartItem(id));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  const handleAddToCartEdit = (productId) => {
    if (!productId) {
      console.error("Product ID is missing!");
      return;
    }

    const newQuantity = quantities[productId] ?? 1;

    console.log(
      "Updating Product ID:",
      productId,
      "New Quantity:",
      newQuantity
    );

    dispatch(
      updateProductCart({ productId, cartData: { quantity: newQuantity } })
    );
  };

  return (
    <>
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-75">
          <FaSpinner className="animate-spin text-5xl text-blue-500" />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          {carts && carts.length > 0 ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
                Your Cart
              </h2>

              {carts.map((item) => (
                <div
                  key={item._id}
                  className="relative flex flex-col sm:flex-row items-center sm:items-start justify-between bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() =>
                        setIsMenuOpen(isMenuOpen === item._id ? null : item._id)
                      }
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <EllipsisVerticalIcon className="w-6 h-6" />
                    </button>

                    {isMenuOpen === item._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-lg p-2 z-10">
                        <button
                          onClick={() =>
                            handleAddToCartEdit(
                              item.productId._id,
                              item.quantity
                            )
                          }
                          className="flex items-center gap-1 w-full text-sm font-semibold text-gray-700 px-3 py-1 rounded-lg hover:bg-blue-100 transition"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleRemoveItem(item.productId._id);
                          }}
                          // onClick={(e) => handleRemoveItem(item.productId, e)}
                          className="flex items-center gap-1 w-full text-sm font-semibold text-red-500 px-3 py-1 rounded-lg hover:bg-red-100 transition"
                        >
                          <TrashIcon className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
                    <Image
                      src={item.productId?.image || "/fallback-image.jpg"}
                      alt={item.productId?.name || "Product Image"}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover shadow-md w-20 h-20 sm:w-[90px] sm:h-[90px]"
                    />
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.productId?.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.productId?.category}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2 sm:truncate">
                        {item.productId?.description}
                      </p>
                      <p className="text-md mt-1 font-medium text-indigo-600">
                        ${item.productId?.price}
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-3 sm:gap-4 mt-6 sm:mt-11 border-t border-gray-300 pt-4 sm:border-0">
                    <button
                      onClick={() => {
                        const newQuantity = Math.max(
                          1,
                          (quantities[item.productId._id] || item.quantity) - 1
                        );
                        handleQuantityChange(item.productId._id, newQuantity);
                      }}
                      className="w-9 h-9 flex items-center justify-center text-lg bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                      -
                    </button>

                    <span className="text-lg font-semibold">
                      {quantities[item.productId._id] || item.quantity}
                    </span>

                    <button
                      onClick={() => {
                        const newQuantity =
                          (quantities[item.productId._id] || item.quantity) + 1;
                        handleQuantityChange(item.productId._id, newQuantity);
                      }}
                      className="w-9 h-9 flex items-center justify-center text-lg bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-700 transition text-lg font-medium">
                Proceed to Checkout
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center mt-46">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 text-gray-400 mb-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2 10h14l2-6H5" />
              </svg>

              <h1 className="text-center text-2xl sm:text-3xl font-semibold text-gray-700">
                Your Cart is Empty.
              </h1>
              <p className="text-gray-500 mt-2 text-lg">
                Start adding products to your cart now!
              </p>

              <button
                onClick={() => navigate("/shop")}
                className="mt-6 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
              >
                Shop Now
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
