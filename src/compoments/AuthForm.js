"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "./authAction";
import { useRouter } from "next/navigation";
import { ApiRoutes } from "@/constant/constant";
// import styles from "./main.module.css";
import axios from "axios";

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
    // <div className={styles.container}>
    //   <h2 className={styles.title}>{isLogin ? "Login" : "Register"}</h2>
    //   <form onSubmit={handleSubmit} className={styles.form}>
    //     {!isLogin && (
    //       <div className={styles.inputGroup}>
    //         <label htmlFor="name" className={styles.label}>
    //           Your Name
    //         </label>
    //         <input
    //           type="text"
    //           id="name"
    //           value={userName}
    //           onChange={(e) => setUserName(e.target.value)}
    //           placeholder="Enter your name"
    //           className={styles.input}
    //           required
    //         />
    //       </div>
    //     )}

    //     <div className={styles.inputGroup}>
    //       <label htmlFor="email" className={styles.label}>
    //         Email Address
    //       </label>
    //       <input
    //         type="email"
    //         id="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         placeholder="Enter your email"
    //         className={styles.input}
    //         required
    //       />
    //     </div>

    //     <div className={styles.inputGroup}>
    //       <label htmlFor="password" className={styles.label}>
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         placeholder="Enter your password"
    //         className={styles.input}
    //         required
    //       />
    //     </div>

    //     <button type="submit" className={styles.button}>
    //       {isLogin ? "Login" : "Register"}
    //     </button>
    //   </form>

    //   <div className={styles.footer}>
    //     <p className={styles.switchText}>
    //       {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
    //       <button
    //         type="button"
    //         onClick={() => setIsLogin(!isLogin)}
    //         className={styles.linkButton}
    //       >
    //         {isLogin ? "Register here" : "Login here"}
    //       </button>
    //     </p>

    //     {isLogin && (
    //       <button
    //         type="button"
    //         onClick={requestPasswordReset}
    //         className={styles.linkButton}
    //       >
    //         Forgot Password?
    //       </button>
    //     )}

    //     {message && (
    //       <p
    //         className={`${styles.message} ${
    //           message.includes("successfully") ? styles.success : styles.error
    //         }`}
    //       >
    //         {message}
    //       </p>
    //     )}
    //     {authError && <p className={styles.error}>{authError}</p>}
    //   </div>
    // </div>

    <div className="flex items-center justify-center mt-35 bg-cover bg-center bg-no-repeat">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg rounded-2xl p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>
        <div className="w-16 h-1 bg-blue-500 mx-auto mt-2 rounded"></div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                required
              />
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
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
  );
}
