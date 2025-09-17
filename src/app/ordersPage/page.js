"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllOrders, updateOrder } from "../../store/features/orderSlice";
import {
  getDiscountOfferOrder,
  updateDiscountOrder,
} from "../../store/features/discountOrderSlice";
import {
  getAllMultiplesOrders,
  updateOrdersStatus,
} from "../../store/features/multipleorderSlice";
import Image from "next/image";
import Navbar from "../../components/navbar";
// import Footer from "../../compoments/footer";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import FashionStoreLoader from "../../components/storeLoader";
import { motion } from "framer-motion";
import { Card , Typography, Box } from "@mui/material";


export default function OrdersPageDashboard() {
  const [orderList, setOrderList] = useState();
  const [discountOrder, setDiscountOrder] = useState();
  const [orders, setOrder] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [openOrderId, setOpenOrderId] = useState(null);

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

    dispatch(getAllMultiplesOrders())
      .then((result) => {
        console.log("API Response:", result.payload);
        setOrder(result.payload.data);
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

  const handleUpdateOrdersStatus = (orderId, status) => {
    const updatedData = { status };

    dispatch(updateOrdersStatus({ id: orderId, orderData: updatedData }))
      .then((result) => {
        console.log("API Response:", result.payload);

        dispatch(getAllMultiplesOrders())
          .then((result) => {
            console.log("API Response:", result.payload);
            setOrder(result.payload.data);
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

  return (
    <>
      <Navbar />

      {loading && <FashionStoreLoader order={true} />}

      {!loading ? (
        <>
          <div className="p-6 max-w-5xl mx-auto">
            {/* <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Orders
            </h1> */}

            <Card
              elevation={4}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                p: 2,
                borderRadius: 1,
                position: "relative",
                overflow: "hidden",
                mb: 5,
                background: "linear-gradient(135deg, #f9fafb, #ffffff)",
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              {/* Left accent bar */}
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "6px",
                  bgcolor: "primary.main",
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                }}
              />

              {/* Text Content */}
              <Box sx={{ pl: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "text.primary",
                    letterSpacing: 0.5,
                  }}
                >
                  Orders History
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: "text.secondary",
                    fontWeight: 500,
                  }}
                >
                  Track all your latest orders status with ease
                </Typography>
              </Box>
            </Card>

            <div className="grid gap-4">
              {orderList && orderList.length > 0 ? (
                orderList.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white shadow-lg p-5 border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-gray-700 break-all">
                          Order ID:{" "}
                          <span className="text-sm text-gray-500 bg-orange-100 p-1 rounded-2xl">
                            {order._id}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 break-words">
                          Ordered by:{" "}
                          <span className="font-medium">{order.firstName}</span>{" "}
                          <span className="font-medium">{order.lastName}</span>{" "}
                          (<span className="break-all">{order.email}</span>)
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
                      {/* <p className="font-medium text-gray-700">Address:</p> */}
                      <p className="text-sm text-gray-600">
                        <strong>Address:</strong> {order.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>City:</strong> {order.city}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Poster code:</strong> {order.posterCode}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>Phone no:</strong> {order.phone}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4 sm:mb-0">
                      {order.products.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50"
                        >
                          <Image
                            src={item.productId.images[0]}
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
                <div className="flex flex-col items-center justify-center mt-10 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md mx-auto">
                  <svg
                    className="w-10 h-10 text-gray-400 mb-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6M5 12h2m10 0h2m-6 4h.01m6 0h.01m-12 0h.01m6 4h.01"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-700">
                    No Orders Found
                  </h3>
                  <p className="text-sm text-gray-500 text-center mt-1">
                    You haven’t placed any orders yet.
                  </p>
                </div>
              )}
            </div>

            {orders && orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order, index) => (
                  <div
                    key={order._id || index}
                    className="border border-gray-200 mt-4 p-6 shadow-lg bg-white"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-gray-700 break-all">
                          Order ID:{" "}
                          <span className="text-sm text-gray-500 bg-orange-100 p-1 rounded-2xl">
                            {order._id}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 break-words">
                          Ordered by:{" "}
                          <span className="font-medium">{order.firstName}</span>{" "}
                          <span className="font-medium">{order.lastName}</span>{" "}
                          (<span className="break-all">{order.email}</span>)
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
                                            handleUpdateOrdersStatus(
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
                      {/* <p className="font-medium text-gray-700">Address:</p> */}
                      <p className="text-sm text-gray-600">
                        <strong>Address:</strong> {order.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>City:</strong> {order.city}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Poster code:</strong> {order.posterCode}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>Phone no:</strong> {order.phone}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="font-semibold text-gray-800 mb-2">
                        Products:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.products.map((prod, i) => (
                          <div
                            key={prod.productId?._id || i}
                            className="border  p-3 bg-gray-50 flex gap-4 items-center"
                          >
                            {prod.image ? (
                              <Image
                                width={300}
                                height={300}
                                src={prod.image}
                                alt={prod.name}
                                className="w-16 h-16 object-cover rounded hover:scale-105"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-gray-200 rounded"></div>
                            )}
                            <div>
                              <p className="font-bold text-gray-800">
                                {prod.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                Qty: {prod.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-right mt-3 text-lg font-bold text-gray-700">
                      Total: ${order.totalPrice}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}

            <div className="mt-10">
              {discountOrder && discountOrder.length > 0 ? (
                <>
                  <div className="w-full bg-gradient-to-r from-blue-100 to-blue-50 p-5 mb-6 shadow-sm border border-blue-200">
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 tracking-tight">
                      Discount Orders
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

                        {order.products.map((item, idx) => (
                          <div key={idx} className="mb-4">
                            <Image
                              src={item.productId?.image}
                              alt={item.productId?.name}
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="w-full sm:w-[375px] h-auto rounded-lg mb-3 object-cover"
                            />

                            <p className="font-medium text-gray-800 mb-1 text-center">
                              {item.productId?.name}
                            </p>

                            <div className="flex justify-between text-sm text-gray-700 px-2">
                              <span>
                                Qty:{" "}
                                <span className="text-blue-700">
                                  {item.quantity}
                                </span>
                              </span>
                              <span>
                                Price:{" "}
                                <span className="text-blue-700">
                                  ${item.productId?.discountPrice}
                                </span>
                              </span>
                            </div>
                          </div>
                        ))}

                        <p className="text-sm text-green-600 font-semibold">
                          Total Price: Rs. {order.totalPrice}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="flex justify-between items-center mb-2">
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
                          </div>
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

                        {/* <p className="text-sm text-green-600 font-semibold">
                          Total Price: Rs. {order.totalPrice}
                        </p> */}

                        <hr className="my-3" />

                        <p className="text-sm text-gray-600">
                          Name: {order.firstName} {order.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Email: {order.email}
                        </p>

                        <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg shadow">
                          <p className="font-semibold text-gray-800 mb-2">
                            Shipping Address:
                          </p>
                          <p className="mb-1">
                            <span className="font-medium text-gray-600">
                              Address:
                            </span>{" "}
                            {order.address}
                          </p>
                          <p className="mb-1">
                            <span className="font-medium text-gray-600">
                              City:
                            </span>{" "}
                            {order.city}
                          </p>
                          <p className="mb-1">
                            <span className="font-medium text-gray-600">
                              Postcode:
                            </span>{" "}
                            {order.posterCode}
                          </p>
                          <p>
                            <span className="font-medium text-gray-600">
                              Phone:
                            </span>{" "}
                            {order.phone}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center mt-10 px-6 py-8 bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md mx-auto">
                  <svg
                    className="w-10 h-10 text-gray-400 mb-3"
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
                  <h3 className="text-lg font-semibold text-gray-700">
                    No Discount Orders
                  </h3>
                  <p className="text-sm text-gray-500 text-center mt-1">
                    You haven’t placed any discount-based orders yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}

      {/* {!loading && <Footer />} */}
    </>
  );
}
