"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail } from "./authAction";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../app/emailVerify/main.module.css";
// import withAuthCheck from "../HOC/withAuth";

export default function EmailVerifyComponent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  const router = useRouter();
  const isVerified = token ? verifyEmail(token) : false;

  useEffect(() => {

    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user")) || null;
  
      if (!user) {
        router.push("/");
      }
    }

    if (token) {
      dispatch(verifyEmail(token));
    }
    console.log(isVerified);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token]);

  useEffect(() => {
    console.log(isVerified);
    if (isVerified) {
      router.push("/fashion-store");
    }
  }, [isVerified, router]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          {isVerified ? "Email Verified" : "Verify Your Email"}
        </h1>
        <p className={styles.message}>
          {isVerified
            ? "Your email has been successfully verified!"
            : "Please check your inbox for a verification link and follow the instructions to verify your email address."}
        </p>
      </div>
    </div>
  );
}

// export default withAuthCheck(EmailVerifyComponent);
