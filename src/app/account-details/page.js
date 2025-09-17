"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accountDetailsUpdate } from "../../components/authAction";
import { setErrorUpdate } from "../../store/features/AccountUpdateSlice";
import Navbar from "../../components/navbar";
import WishlistComponent from "@/components/wishlistComp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { FaUserCircle } from "react-icons/fa";

export default function AcountDetails() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.account);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

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
      toast.success("Account details updated successfully! 🎉", {
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

      <div className="px-4 py-10 sm:px-6 lg:px-8 mt-7">
        <div className="max-w-7xl mx-auto bg-white rounded-t-2xl shadow-md overflow-hidden">
          <div className="bg-blue-800 px-6 py-5 sm:px-8">
            <h1 className="text-white text-2xl font-semibold">
              Account Details
            </h1>
          </div>

          <div className="mb-2 bg-white rounded-t-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-xl font-bold uppercase">
                {user?.userName?.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {user?.userName}
                </h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-gray-600">
                Welcome back,{" "}
                <span className="text-blue-600 font-medium">
                  {user?.userName?.split(" ")[0] || "User"}
                </span>
                !
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-7 space-y-6 bg-white shadow-md rounded-lg">
            <p className="text-sm text-blue-700 bg-blue-100 border border-blue-200 p-3 rounded-md">
              Manage your personal information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="peer w-full px-4 pt-4 pb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full px-4 pt-4 pb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-4 pt-4 pb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="pt-4">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white font-medium rounded-lg transition"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
          <WishlistComponent />
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
