"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "./authAction";
import { useRouter } from "next/navigation";
import { ApiRoutes } from "@/constant/constant";
import styles from "./main.module.css";
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
    <div className={styles.container}>
      <h2 className={styles.title}>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className={styles.input}
              required
            />
          </div>
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className={styles.footer}>
        <p className={styles.switchText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className={styles.linkButton}
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>

        {isLogin && (
          <button
            type="button"
            onClick={requestPasswordReset}
            className={styles.linkButton}
          >
            Forgot Password?
          </button>
        )}

        {message && (
          <p
            className={`${styles.message} ${
              message.includes("successfully") ? styles.success : styles.error
            }`}
          >
            {message}
          </p>
        )}
        {authError && <p className={styles.error}>{authError}</p>}
      </div>
    </div>
  );
}
