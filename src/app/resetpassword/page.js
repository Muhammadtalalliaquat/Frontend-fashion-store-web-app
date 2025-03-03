import { Suspense } from 'react';
import  ResetpasswordComponment from "../../compoments/resetpassword"



export default function Resetpassword() {
  return (
    <Suspense>
      <ResetpasswordComponment />
    </Suspense>
  );
}





























// "use client";

// import { ApiRoutes } from "@/constant/constant";
// import style from "../resetpassword/main.module.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSearchParams } from "next/navigation";
// import { ToastContainer, toast, Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Resetpassword() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");
//   const id = searchParams.get("id");

//   const [password, setPassword] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   // const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     console.log("data revicve", token, "userId", id);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const hanedlePasswordReset = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!password) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await axios.post(ApiRoutes.forgotPasswordSent, {
//         id,
//         token,
//         password,
//       });
//       console.log(response.data?.data?.user);
//       const message =
//         response.data?.data?.message || "Password reset successful.";
//       // setSuccessMessage(message);
//       toast.info(`🦄 ${message}`, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//       });
//       setError(null);
//       setIsSubmitting(false);
//       setPassword("");
//     } catch (error) {
//       console.log("Error resetting password:", error);
//       const errorMessage = error.response?.data?.msg || "Something went wrong.";
//       setError(errorMessage);
//       // setSuccessMessage("");
//     }
//   };

//   return (
//     <div className={style.resetPasswordContainer}>
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Bounce}
//       />
//       <h2>Reset Password</h2>
//       {error && <p className={style.errorMessage}>{error}</p>}
//       <form onSubmit={hanedlePasswordReset}>
//         <div className={style.formGroup}>
//           <label htmlFor="password">New Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className={style.input}
//           />
//         </div>
//         <button type="submit" disabled={isSubmitting} className={style.button}>
//           {isSubmitting ? "Resetting..." : "Save Password"}
//         </button>
//       </form>
//       {/* {successMessage && (
//         <p className={style.successMessage}>{successMessage}</p>
//       )} */}
//     </div>
//   );
// }
