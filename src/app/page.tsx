"use client";
// import Image from "next/image";
// import GetStarted from "../app/get-started/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
  isAdmin: boolean;
};

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    const user: User | null = storedData ? JSON.parse(storedData) : null;
    console.log(storedData , "here")
    if (user?.isAdmin === true) {
      router.push("/admin-add-product");
    } else if (user) {
      router.push("/fashion-store");
    } else {
      router.push("/get-started");
    }
  }, [router]);

  // return <GetStarted />;
}
