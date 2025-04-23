"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllOrders, updateOrder } from "../../store/features/orderSlice";
import {
  getDiscountOfferOrder,
  updateDiscountOrder,
} from "../../store/features/discountOrderSlice";
import Image from "next/image";
import Navbar from "../../compoments/navbar";
import { FaSpinner } from "react-icons/fa";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function OrdersPageDashboard() {
  const [orderList, setOrderList] = useState();
  const [discountOrder, setDiscountOrder] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [openOrderId, setOpenOrderId] = useState(null);

  const toggleDropdown = (orderId) => {
    setOpenOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleStatusChange = (orderId, status) => {
    const updatedData = { status };

    dispatch(updateOrder({ id: orderId, orderData: updatedData }))
      .then((result) => {
        console.log("API Response:", result.payload);

        dispatch(getAllOrders())
          .then((result) => {
            console.log("API Response:", result.payload);
            setOrderList(result.payload.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Fetch Error:", err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      });
  };

  const handleUpdateStatus = (orderId, status) => {
    const updatedData = { status };

    dispatch(updateDiscountOrder({ id: orderId, orderData: updatedData }))
      .then((result) => {
        console.log("API Response:", result.payload);

        dispatch(getDiscountOfferOrder())
          .then((result) => {
            console.log("API Response:", result.payload);
            setDiscountOrder(result.payload.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Fetch Error:", err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      });
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    dispatch(getAllOrders())
      .then((result) => {
        console.log("API Response:", result.payload);
        setOrderList(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });

    dispatch(getDiscountOfferOrder())
      .then((result) => {
        console.log("API Response:", result.payload);
        setDiscountOrder(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <FaSpinner className="animate-spin text-5xl text-blue-500" />
        </div>
      ) : (
        <>
          <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Orders
            </h1>

            <div className="grid gap-6">
              {orderList && orderList.length > 0 ? (
                orderList.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-gray-700 break-all">
                          Order ID:{" "}
                          <span className="text-sm text-gray-500">
                            {order._id}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 break-words">
                          Ordered by:{" "}
                          <span className="font-medium">
                            {order.userId.userName}
                          </span>{" "}
                          (
                          <span className="break-all">
                            {order.userId.email}
                          </span>
                          )
                        </p>
                        <p className="text-xs text-gray-400">
                          Date: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 relative">
                        <span
                          className={`px-3 py-1 text-sm rounded-full font-medium capitalize ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "processing"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "shipped"
                              ? "bg-green-100 text-green-700"
                              : order.status === "delivered"
                              ? "bg-purple-100 text-purple-700"
                              : order.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status}
                        </span>

                        {user.isAdmin && (
                          <div className="relative">
                            <span
                              onClick={() => toggleDropdown(order._id)}
                              className="cursor-pointer hover:text-gray-600"
                            >
                              <PencilSquareIcon className="w-4 h-4 text-gray-500" />
                            </span>

                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{
                                opacity: openOrderId ? 1 : 0,
                                height: openOrderId ? "auto" : 0,
                              }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden absolute right-0 z-10"
                            >
                              {openOrderId === order._id && (
                                <div className="mt-2 w-48 rounded-md shadow-lg bg-white transition-all duration-300 ease-out transform">
                                  <div className="py-1">
                                    {[
                                      "pending",
                                      "processing",
                                      "shipped",
                                      "delivered",
                                      "cancelled",
                                    ].map((status) => {
                                      const statusClassMap = {
                                        pending:
                                          "hover:bg-yellow-200 active:bg-yellow-300",
                                        processing:
                                          "hover:bg-blue-200 active:bg-blue-300",
                                        shipped:
                                          "hover:bg-green-200 active:bg-green-300",
                                        delivered:
                                          "hover:bg-purple-200 active:bg-purple-300",
                                        cancelled:
                                          "hover:bg-red-200 active:bg-red-300",
                                      };

                                      return (
                                        <button
                                          key={status}
                                          onClick={() =>
                                            handleStatusChange(
                                              order._id,
                                              status
                                            )
                                          }
                                          className={`block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md focus:outline-none transition-all ${statusClassMap[status]}`}
                                        >
                                          {status.charAt(0).toUpperCase() +
                                            status.slice(1)}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 border-t border-gray-300 pt-2">
                      <p className="font-medium text-gray-700">Address:</p>
                      <p className="text-sm text-gray-600">
                        <strong>Country:</strong> {order.address.country}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>City:</strong> {order.address.city}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>Area:</strong> {order.address.area}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      {order.products.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50"
                        >
                          <Image
                            src={item.productId.image}
                            alt={item.productId.name}
                            width={90}
                            height={90}
                            className="rounded-lg object-cover transition-transform duration-200 hover:scale-105"
                          />

                          <div>
                            <p className="font-semibold">
                              {item.productId.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity} | Price: $
                              {item.productId.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-right text-lg font-bold text-gray-700">
                      Total: ${order.totalPrice}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center mt-6 p-4 bg-gray-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-gray-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h3m4 0h3M5 12h3m4 0h3m-6 4h.01M6 16h.01m6 0h.01M18 16h.01m-9 4h.01m-6-4h.01"
                    />
                  </svg>
                  <p className="text-gray-600">No orders found</p>
                </div>
              )}
            </div>
            <div className="mt-20">
              {discountOrder && discountOrder.length > 0 ? (
                <>
                  <div className="w-full bg-gray-100 p-4 rounded-md mb-4">
                    <h2 className="text-2xl font-bold text-blue-800">
                      Discount Orders:
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {discountOrder.map((order, index) => (
                      <div
                        key={index}
                        className="bg-white shadow-md p-5 hover:shadow-xl transition-all"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-semibold text-lg text-gray-800">
                            Order #{index + 1}
                          </h3>
                          <span className="text-sm text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <Image
                          src={order.productId.image}
                          alt={order.productId.name}
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-full sm:w-[375px] h-auto rounded-lg mb-3 object-cover"
                        />

                        <div className="flex justify-between items-center">
                          <p className="font-medium text-gray-700">
                            Product:{" "}
                            <span className="text-blue-700">
                              {order.productId.name}
                            </span>
                          </p>

                          {user.isAdmin && (
                            <div className="relative">
                              <span
                                onClick={() => toggleDropdown(order._id)}
                                className="cursor-pointer hover:text-gray-600"
                              >
                                <PencilSquareIcon className="w-4 h-4 text-gray-500" />
                              </span>

                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                  opacity: openOrderId ? 1 : 0,
                                  height: openOrderId ? "auto" : 0,
                                }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                className="overflow-hidden absolute right-0 z-10"
                              >
                                {openOrderId === order._id && (
                                  <div className="mt-2 w-48 rounded-md shadow-lg bg-white transition-all duration-300 ease-out transform">
                                    <div className="py-1">
                                      {[
                                        "pending",
                                        "processing",
                                        "shipped",
                                        "delivered",
                                        "cancelled",
                                      ].map((status) => {
                                        const statusClassMap = {
                                          pending:
                                            "hover:bg-yellow-200 active:bg-yellow-300",
                                          processing:
                                            "hover:bg-blue-200 active:bg-blue-300",
                                          shipped:
                                            "hover:bg-green-200 active:bg-green-300",
                                          delivered:
                                            "hover:bg-purple-200 active:bg-purple-300",
                                          cancelled:
                                            "hover:bg-red-200 active:bg-red-300",
                                        };

                                        return (
                                          <button
                                            key={status}
                                            onClick={() =>
                                              handleUpdateStatus(
                                                order._id,
                                                status
                                              )
                                            }
                                            className={`block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md focus:outline-none transition-all ${statusClassMap[status]}`}
                                          >
                                            {status.charAt(0).toUpperCase() +
                                              status.slice(1)}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            </div>
                          )}
                        </div>
                        {/* <p className="text-sm text-gray-600">
                            Quantity: {order.quantity}
                          </p> */}
                        <p className="text-sm text-green-600 font-semibold">
                          Total Price: Rs. {order.totalPrice}
                        </p>
                        <p
                          className={`inline-block text-xs sm:text-sm rounded-md mt-1 font-medium capitalize
                          ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "processing"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "shipped"
                              ? "bg-green-100 text-green-700"
                              : order.status === "delivered"
                              ? "bg-purple-100 text-purple-700"
                              : order.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }
                           px-2 py-0.5
                          `}
                        >
                          Status: {order.status}
                        </p>

                        <hr className="my-3" />

                        <p className="text-sm text-gray-600">
                          Name: {order.userId?.userName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Email: {order.userId?.email}
                        </p>

                        <div className="mt-2 text-sm text-gray-600">
                          <p className="font-medium text-gray-700">
                            Shipping Address:
                          </p>
                          <p>Country: {order.address.country}</p>
                          <p>City: {order.address.city}</p>
                          <p>Area: {order.address.area}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center mt-6 p-4 bg-gray-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-gray-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h3m4 0h3M5 12h3m4 0h3m-6 4h.01M6 16h.01m6 0h.01M18 16h.01m-9 4h.01m-6-4h.01"
                    />
                  </svg>
                  <p className="text-gray-600">No discount orders found.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
