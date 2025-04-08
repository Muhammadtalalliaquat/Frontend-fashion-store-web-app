"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllOrders } from "../../store/features/orderSlice";
import Image from "next/image";
import Navbar from "../../compoments/navbar";
import { FaSpinner } from "react-icons/fa";

export default function OrdersPageDashboard() {
  const [orderList, setOrderList] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            {orderList?.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-semibold text-gray-700">
                      Order ID:{" "}
                      <span className="text-sm text-gray-500">{order._id}</span>
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
                          Qty: {item.quantity} | Price: ${item.productId.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-right text-lg font-bold text-gray-700">
                  Total: ${order.totalPrice}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
