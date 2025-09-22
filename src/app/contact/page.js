"use client";

import Navbar from "../../components/navbar";
import { motion } from "framer-motion";
import { createContact } from "../../store/features/contactSlice";
import { createFeedback } from "../../store/features/feedbackSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import Link from "next/link";
import Footer from "../../components/footer";

import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
} from "@mui/material";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Submitting, setSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [feedBackMessage, setFeedBackMessage] = useState("");
  const [user, setUser] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [mounted, setMounted] = useState(false);

  const dispatch = useDispatch();
  // const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR ke dauraan kuch render mat karo
    return null;
  }

  const handleAddConatcData = (e) => {
    e.preventDefault();

    if (!user) {
      setActivePopup(true);
      return;
    }

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

        // if (error) {
        //   setErrorMessage(msg || "Something went wrong.");
        //   setIsSubmitting(false);
        //   return;
        // }

        if (error) {
          // Agar backend array bheje
          if (msg) {
            const fieldErrors = {};
            msg.forEach((m) => {
              if (m.toLowerCase().includes("first name"))
                fieldErrors.firstName = m;
              if (m.toLowerCase().includes("last name"))
                fieldErrors.lastName = m;
              if (m.toLowerCase().includes("email")) fieldErrors.email = m;
              if (m.toLowerCase().includes("message")) fieldErrors.message = m;
            });
            setErrorMessage(fieldErrors);
          } else {
            setErrorMessage({ general: msg });
          }

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

  const handleAddFeedbackData = (e) => {
    e.preventDefault();

    if (!user) {
      setActivePopup(true);
      return;
    }

    setSubmitting(true);
    setError("");

    dispatch(createFeedback({ feedBackMessage }))
      .then((result) => {
        console.log("API Response:", result.payload);

        const { error, msg } = result.payload || {};

        if (error) {
          setError(msg || "Something went wrong. Please try again.");
          setSubmitting(false);
          return;
        }

        toast.success("Feedback submitted successfully!", {
          position: "bottom-right",
        });
        setError("");
        setSubmitting(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("An unexpected error occurred.");
        setSubmitting(false);
      });
  };

  return (
    <>
      <Navbar />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // bgcolor: "white",
          px: { xs: 2, sm: 6 },
          mt: { xs: 0, md: 0 },
          pt: { xs: 5, md: 6 },
          pb: { xs: 10, md: 10 },
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ width: "100%", maxWidth: "1200px" }}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 6 },
              borderRadius: 2,
              backdropFilter: "blur(12px)",
            }}
          >
            <Grid container spacing={6}>
              {/* Left: Contact Form */}
              <Grid item xs={12} md={6}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Contact Us
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  We would love to hear from you! Whether you have a question,
                  feedback, or need assistance, feel free to reach out. Our team
                  is here to help you with anything you need.
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleAddConatcData}
                  sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={Boolean(errormessage.firstName)}
                        helperText={errormessage.firstName}
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={Boolean(errormessage.lastName)}
                        helperText={errormessage.lastName}
                        // required
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    type="email"
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errormessage.email)}
                    helperText={errormessage.email}
                    // required
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    error={Boolean(errormessage.message)}
                    helperText={errormessage.message}
                    // required
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "black",
                      "&:hover": { bgcolor: "grey.900" },
                    }}
                    onClick={() => {
                      if (!user) setActivePopup(true);
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </Box>
                {errormessage.general && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {error.general}
                  </Typography>
                )}
              </Grid>

              {/* Right: Feedback Form */}
              <Grid item xs={12} md={6}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Website Feedback
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  We would love to hear your thoughts about our website.
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleAddFeedbackData}
                  sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Your Feedback"
                    value={feedBackMessage}
                    onChange={(e) => setFeedBackMessage(e.target.value)}
                    error={Boolean(error)}
                    helperText={error || "Your feedback helps us improve!"}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "primary.main",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                    disabled={Submitting}
                  >
                    {Submitting ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Submit Feedback"
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>

            {/* Footer */}
            <Box mt={6} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Need help? Email us at{" "}
                <Link
                  href="mailto:support@fashionstore.com"
                  underline="hover"
                  color="black"
                  fontWeight="medium"
                >
                  support@fashionstore.com
                </Link>
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        {/* Popup (Login Required) */}
        <Dialog open={activePopup} onClose={() => setActivePopup(null)}>
          <DialogTitle>You need to log in</DialogTitle>
          <DialogContent>
            <Typography>You need to log in to contact our team.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActivePopup(false)}>Cancel</Button>
            <Button
              variant="contained"
              href="/login"
              sx={{ bgcolor: "primary.main" }}
            >
              Go to Login
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {/* <div className="min-h-screen flex items-center justify-center bg-white max-w-7xl w-full mx-auto sm:p-12 mt-10 md:mt-18">
        <ToastContainer />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-lg max-w-7xl w-full mx-4 md:mx-10 p-10 md:p-2 grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div className="text-left mb-10">
            <h1 className="text-lg md:text-2xl font-bold text-gray-900">
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
                    You need to log in to contact our team.
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
                className="w-full bg-gray-800 hover:bg-gray-900 text-sm sm:text-base text-white font-semibold py-2 shadow-md transition duration-300"
                // className="w-full bg-black text-white font-semibold py-4 hover:bg-gray-800 transition flex items-center justify-center"
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
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base text-white font-semibold py-2 shadow-md transition duration-300"
                  // className="w-full bg-blue-600 text-white font-semibold py-4 hover:bg-blue-700 transition flex items-center justify-center"
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
      </div> */}

      <Footer />
    </>
  );
}
