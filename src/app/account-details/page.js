"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accountDetailsUpdate } from "../../components/authAction";
import { setErrorUpdate } from "../../store/features/AccountUpdateSlice";
import Navbar from "../../components/navbar";
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
      console.log(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  let cars = ["nisan", "Calora", "suzuki", "Civic"];
  console.log(cars.lastIndexOf(1));

  return (
    <>
      <Navbar />

      <div className="px-4 py-10 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-4xl mx-auto bg-white rounded-t-2xl shadow-md overflow-hidden">
          {/* Header */}
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

          {/* Form Section */}
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
                  // className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                  // className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                // className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
        </div>
        <ToastContainer />
      </div>

      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
      </div> */}
    </>
  );
}
