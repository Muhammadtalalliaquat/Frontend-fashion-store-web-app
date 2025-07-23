"use client";

import { ApiRoutes } from "@/constant/constant";
// import style from "../app/resetpassword/main.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
// import withAuthCheck from "../HOC/withAuth";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function ResetpasswordComponment() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  // const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!id || !token) {
      router.push("/");
    }
    console.log("Data received:", token, "UserID:", id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hanedlePasswordReset = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!password) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(ApiRoutes.forgotPasswordSent, {
        id,
        token,
        password,
      });
      console.log(response.data?.data?.user);
      const message =
        response.data?.data?.message || "Password reset successful.";
      // setSuccessMessage(message);
      toast.info(`🦄 ${message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setError(null);
      setIsSubmitting(false);
      setPassword("");
      router.push("/login");
    } catch (error) {
      console.log("Error resetting password:", error);
      const errorMessage = error.response?.data?.msg || "Something went wrong.";
      setError(errorMessage);
      // setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        transition={Bounce}
      />

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-lg sm:text-2xl md:text-3xl text-center text-gray-800 mb-6">
          🔒 Reset Password
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={hanedlePasswordReset}>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {isSubmitting ? "Resetting..." : "Save Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

// export default withAuthCheck(ResetpasswordComponment);
