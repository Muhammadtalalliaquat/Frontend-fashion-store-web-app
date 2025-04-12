"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllOrders, updateOrder } from "../../store/features/orderSlice";
import Image from "next/image";
import Navbar from "../../compoments/navbar";
import { FaSpinner } from "react-icons/fa";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function OrdersPageDashboard() {
  const [orderList, setOrderList] = useState();
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
  }, [dispatch]);

  return (
    <>
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <FaSpinner className="animate-spin text-5xl text-blue-500" />
        </div>
      ) : (
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
                      <p className="font-semibold text-gray-700">
                        Order ID:{" "}
                        <span className="text-sm text-gray-500">
                          {order._id}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Ordered by:{" "}
                        <span className="font-medium">
                          {order.userId.userName}
                        </span>{" "}
                        ({order.userId.email})
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
                                    const colorMap = {
                                      pending: "yellow",
                                      processing: "blue",
                                      shipped: "green",
                                      delivered: "purple",
                                      cancelled: "red",
                                    };
                                    return (
                                      <button
                                        key={status}
                                        onClick={() =>
                                          handleStatusChange(order._id , status)
                                        }
                                        className={`block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-${colorMap[status]}-200 active:bg-${colorMap[status]}-300 focus:outline-none transition-all`}
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

                  {/* <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-semibold text-gray-700">
                        Order ID:{" "}
                        <span className="text-sm text-gray-500">
                          {order._id}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Ordered by:{" "}
                        <span className="font-medium">
                          {order.userId.userName}
                        </span>{" "}
                        ({order.userId.email})
                      </p>
                      <p className="text-xs text-gray-400">
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <span
                        className={`px-3 py-1 text-sm rounded-full font-medium ${
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
                      {order.userId.isAdmin === true && (
                        <div className="relative inline-block text-left">
                          <span onClick={toggleDropdown}>
                            <PencilSquareIcon className="w-4 h-4 text-gray-500" />
                          </span>

                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: isOpen ? 1 : 0,
                              height: isOpen ? "auto" : 0,
                            }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            {isOpen && (
                              <div
                                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white transition-all duration-300 ease-out transform"
                                style={{
                                  opacity: isOpen ? 1 : 0,
                                  transform: isOpen
                                    ? "translateY(0)"
                                    : "translateY(-10px)",
                                }}
                              >
                                <div>
                                  <button className="block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-yellow-200 active:bg-yellow-300 focus:outline-none transition-all">
                                    Pending
                                  </button>
                                  <button className="block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-blue-200 active:bg-blue-300 focus:outline-none transition-all">
                                    Processing
                                  </button>
                                  <button className="block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-green-200 active:bg-green-300 focus:outline-none transition-all">
                                    Shipped
                                  </button>
                                  <button className="block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-purple-200 active:bg-purple-300 focus:outline-none transition-all">
                                    Delivered
                                  </button>
                                  <button className="block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-red-200 active:bg-red-300 focus:outline-none transition-all">
                                    Cancelled
                                  </button>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div> */}

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
                          <p className="font-semibold">{item.productId.name}</p>
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
        </div>
      )}
    </>
  );
}
