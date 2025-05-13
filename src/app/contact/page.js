"use client";

import Navbar from "../../compoments/navbar";
import { motion } from "framer-motion";
import { createContact } from "../../store/features/contactSlice";
import { createFeedback } from "../../store/features/feedbackSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Footer from "../../compoments/footer";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [feedBackMessage, setFeedBackMessage] = useState("");
  const [user, setUser] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);


  const handleAddConatcData = (e) => {
    e.preventDefault();

    const contactData = {
      firstName,
      lastName,
      email,
      message,
    };

    setIsSubmitting(true);
    setErrorMessage("");
    dispatch(createContact(contactData))
      .then((result) => {
        const { error, msg } = result.payload || {};

        if (error) {
          setErrorMessage(msg || "Something went wrong.");
          setIsSubmitting(false);
          return;
        }

        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setIsSubmitting(false);

        toast.success("Successfully sent message.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setErrorMessage("An unexpected error occurred.");
        setIsSubmitting(false);
      });
  };

  // const handleAddConatcData = (e) => {
  //   e.preventDefault();

  //   const contactData = {
  //     firstName,
  //     lastName,
  //     email,
  //     message,
  //   };

  //   setIsSubmitting(true);

  //   dispatch(createContact(contactData))
  //     .then((result) => {
  //       console.log("API Response:", result.payload);
  //        const message = result.payload?.msg;
  //        if (message) {
  //          setErrorMessage(message);
  //        }
  //       setFirstName("");
  //       setLastName("");
  //       setEmail("");
  //       setMessage("");
  //       setIsSubmitting(false);
  //       toast.success("Successfully send message.", {
  //         position: "bottom-right",
  //         autoClose: 3000,
  //       });
  //       // router.push("/fashion-store");
  //     })
  //     .catch((err) => {
  //       console.error("Fetch Error:", err);
  //       setIsSubmitting(false);
  //     });
  // };

  const handleAddFeedbackData = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    dispatch(createFeedback({ feedBackMessage }))
      .then((result) => {
        console.log("API Response:", result.payload);
        // const message = result.payload?.msg;
        // if (message) {
        //   setErrorMessage(message);
        // }
        setFeedBackMessage("");
        setIsSubmitting(false);
        router.push("/fashion-store");
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-5  sm:p-12 mt-10 md:mt-18">
        <ToastContainer />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-lg  max-w-7xl w-full mx-4 md:mx-10 p-10 md:p-2 grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div className="text-left mb-10">
            <h1 className="text-2xl font-bold md:font-bold text-gray-900">
              Contact Us
            </h1>
            <p className="mt-2 text-gray-500">
              We would love to hear from you! Whether you have a question,
              feedback, or need assistance, feel free to reach out. Our team is
              here to help you with anything you need. Simply fill out the form
              below, and we’ll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleAddConatcData} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="block w-full border border-gray-300 p-4 focus:border-black focus:ring-black focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="block w-full border border-gray-300 p-4 focus:border-black focus:ring-black focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full border border-gray-300 p-4 focus:border-black focus:ring-black focus:outline-none"
              />
              {errormessage && (
                <p className="text-sm mt-2 text-center text-pink-500">
                  {errormessage}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="block w-full border border-gray-300 p-4 focus:border-black focus:ring-black focus:outline-none"
              ></textarea>
            </div>

            {activePopup && !user && (
              <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center px-3 z-[9999]">
                <div className="bg-white w-full max-w-sm sm:max-w-md p-4 sm:p-6 shadow-2xl rounded-xl relative">
                  <button
                    onClick={() => setActivePopup(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                  >
                    ×
                  </button>

                  <h2 className="font-medium text-gray-800 p-3 mb-3 text-center">
                    You need to log in to buy this product.
                  </h2>

                  <div className="flex justify-center">
                    <Link
                      href="/login"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Go to Login
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                onClick={() => {
                  if (!user) {
                    setActivePopup(true);
                  }
                }}
                className="w-full bg-black text-white font-semibold py-4 hover:bg-gray-800 transition flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full"></div>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>

          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Website Feedback
            </h2>
            <p className="text-gray-500 mb-6">
              We would love to hear your thoughts about our website.
            </p>

            <form onSubmit={handleAddFeedbackData} className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback
                </label>
                <textarea
                  rows={5}
                  placeholder="Share your thoughts about our website..."
                  value={feedBackMessage}
                  onChange={(e) => setFeedBackMessage(e.target.value)}
                  required
                  className="block w-full border border-gray-300 p-4 focus:border-black focus:ring-black focus:outline-none"
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">
                  Your feedback helps us improve!
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-4 hover:bg-blue-700 transition flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full"></div>
                  ) : (
                    "Submit Feedback"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-10 text-center text-gray-500 text-sm">
            <p>Need help? Email us at</p>
            <Link
              href="mailto:support@fashionstore.com"
              className="text-black underline font-medium"
            >
              support@fashionstore.com
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
