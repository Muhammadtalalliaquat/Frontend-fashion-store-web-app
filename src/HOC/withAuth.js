// "use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function withAdminCheck(WrappedComponent) {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);

      if (!storedUser || storedUser.isAdmin !== true) {
        console.log("Access denied. Redirecting...");
        router.push("/");
      }
    }, [router]);

    if (!user || user.isAdmin !== true) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}



