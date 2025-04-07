"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "./authAction";
import { useRouter } from "next/navigation";
import { ApiRoutes } from "@/constant/constant";
// import styles from "./main.module.css";
import axios from "axios";
// import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  // const [error, setError] = useState(``);
  const dispatch = useDispatch();

  const authError = useSelector((state) => state.user.error);

  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const result = await dispatch(loginUser({ email, password }));
        console.log(result.user, "datat revicced");
        if (result.success) {
          if (result.user?.isAdmin === true) {
            router.push("/admin-add-product");
          } else {
            router.push("/fashion-store");
          }
          // router.push("/adminDashboard");
        } else {
          console.log("Please verify your email before proceeding.");
        }
      } else {
        const result = await dispatch(
          registerUser({ email, password, userName })
        );

        if (result.success) {
          router.push("/emailVerify");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // setError("An unexpected error occurred. Please try again.");
    }
  };

  const requestPasswordReset = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter an email");

      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    try {
      setMessage("");
      const response = await axios.post(ApiRoutes.forgotPassword, { email });

      if (!response.data.error) {
        setMessage(
          response.data.msg || "Password reset email sent successfully."
        );
      } else {
        setMessage("An error occurred while sending the reset email.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        "Failed to send reset email. Please try again.";
      console.error("Error:", errorMessage);
      setMessage(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="flex items-center justify-center pt-35 bg-cover bg-center bg-no-repeat">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg rounded-2xl p-8 max-w-sm w-full">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {isLogin ? "Login" : "Register"}
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white"></div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {!isLogin && (
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  // className="text-sm font-semibold text-gray-600"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  // className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                // className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                // className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <button
              type="submit"
              // className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 font-semibold hover:underline"
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </div>

          {isLogin && (
            <div className="mt-2 text-center">
              <button
                onClick={requestPasswordReset}
                className="text-blue-500 text-sm font-semibold hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {message && (
            <p className="text-green-500 text-sm text-center mt-2">{message}</p>
          )}
          {authError && (
            <p className="text-red-500 text-sm text-center mt-2">{authError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
