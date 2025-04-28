"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accountDetailsUpdate } from "../../compoments/authAction";
import { setErrorUpdate } from "../../store/features/AccountUpdateSlice";
import Navbar from "../../compoments/navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserCircle } from "react-icons/fa";

export default function AcountDetails() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.account);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setUserName(storedUser.userName);
      setEmail(storedUser.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setErrorUpdate(null));
    const response = await dispatch(
      accountDetailsUpdate({ userName, email, password })
    );

    if (response.success) {
      console.log("Account updated successfully!");
      toast.success("Account updated successfully! 🎉", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      console.log(response.error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white text-center">
            <div className="flex items-center justify-center gap-4">
              <FaUserCircle className="text-5xl bg-white text-gray-600 rounded-full p-2 shadow-md" />
              <h2 className="text-3xl font-bold mb-2">Your Profile</h2>
            </div>
            <p className="text-lg mt-4">Manage your account details</p>
          </div>

          <div className="p-6">
            <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="text-lg font-normal text-gray-500">
                Username:{" "}
                <span className="font-bold text-green-700">
                  {user?.userName || ""}
                </span>
              </p>
              <p className="text-lg font-normal text-gray-500">
                Email:{" "}
                <span className="font-bold text-green-700">
                  {user?.email || ""}
                </span>
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Update Account
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">
                  New Username
                </label>
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="peer w-full px-4 pt-4 pb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  New Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full px-4 pt-4 pb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full px-4 pt-4 pb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter new password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Account"}
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
