"use client";

import Navbar from "../../components/navbar";
import withAdminCheck from "../../HOC/withAuth";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllContact } from "../../store/features/contactSlice";
import { FaSpinner } from "react-icons/fa";

function AdminDashboard() {
  const dispatch = useDispatch();
  const [contact, setContact] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllContact())
      .then((result) => {
        console.log("API Response:", result.payload);
        setContact(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err, error);
        setError("Failed to load products.");
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-75 z-50">
          <FaSpinner className="animate-spin text-5xl text-blue-500" />
        </div>
      ) : contact.length > 0 ? (
        <div className="min-h-screen bg-gray-50 p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 shadow-md mb-6 mt-20">
            <h1 className="text-2xl sm:text-2xl font-bold text-grey-300">
              Customer Issue Dashboard
            </h1>
            <span className="text-sm text-gray-600 mt-2 sm:mt-0 sm:text-right">
              Total Issues:{" "}
              <span className="font-semibold text-gray-800">
                {contact.length}
              </span>
            </span>
          </div>

          {/* Issue Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contact.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 shadow-sm  p-5 hover:shadow-md transition-all duration-300"
              >
                <div className="mb-3">
                  <h2 className="text-xl font-semibold text-blue-700">
                    {item.subject}
                  </h2>
                </div>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">First Name:</span>{" "}
                    {item.firstName}
                  </p>
                  <p>
                    <span className="font-medium">Last Name:</span>{" "}
                    {item.lastName}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {item.email}
                  </p>
                  <p className="text-gray-700 bg-gray-100 p-3 rounded-lg border border-gray-200 mt-2">
                    <span className="font-semibold text-red-800">Message:</span>{" "}
                    {item.message}
                  </p>
                </div>
                <p className="mt-4 text-xs text-gray-400">
                  Received: {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No customer issues found.
        </p>
      )}
    </>
  );
}

export default withAdminCheck(AdminDashboard);
