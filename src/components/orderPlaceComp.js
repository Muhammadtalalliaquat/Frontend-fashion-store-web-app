"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createOrder } from "../store/features/orderSlice";
import { getAllReview } from "../store/features/productReviewSlice";
import Navbar from "../components/navbar";
import { useDispatch } from "react-redux";
import Image from "next/image";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

export default function PlaceOrderComp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const quantity = searchParams.get("quantity");
  // const image = searchParams.get("image");
  const imageParam = searchParams.get("image");
  const image = imageParam ? JSON.parse(imageParam) : [];
  const productId = searchParams.get("productId");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [posterCode, setPostercode] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedItems = localStorage.getItem("orderItems");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      console.log(parsedItems);
    }
  }, []);

  useEffect(() => {
    // if (errorMsg) {
    //   const timer = setTimeout(() => setErrorMsg(""), 3000);
    //   return () => clearTimeout(timer);
    // }

    dispatch(getAllReview(productId))
      .then((result) => {
        console.log("API Response:", result.payload);
        setReviews(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err, error);
        setLoading(false);
      });
  }, [dispatch, productId]);

  const handleOrderPlacement = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderFormData = {
      email,
      firstName,
      lastName,
      city,
      posterCode,
      phone,
      address,
      productId,
      quantity,
    };

    console.log("Sending Order Data:", orderFormData);

    dispatch(createOrder(orderFormData))
      .then((result) => {
        const { error, msg } = result.payload || {};

        if (error) {
          if (Array.isArray(msg)) {
            const fieldErrors = {};

            msg.forEach((m) => {
              const lower = m.toLowerCase();

              if (lower.includes("first name")) fieldErrors.firstName = m;
              else if (lower.includes("last name")) fieldErrors.lastName = m;
              else if (lower.includes("email")) fieldErrors.email = m;
              else if (lower.includes("city")) fieldErrors.city = m;
              else if (lower.includes("poster code"))
                fieldErrors.posterCode = m;
              else if (lower.includes("phone")) fieldErrors.phone = m;
              else if (lower.includes("address")) fieldErrors.address = m;
              else fieldErrors.general = m;
              console.log(lower, "here");
            });

            setErrorMsg(fieldErrors);
          } else {
            setErrorMsg({ general: msg || "Something went wrong" });
          }

          setIsSubmitting(false);
          return;
        } else {
          const message = msg || "Order placed successfully.";

          if (message) {
            setSuccessMsg(message);
            if (message.toLowerCase().includes("placed")) {
              router.push("/ordersPage");
            }
          }

          setEmail("");
          setFirstName("");
          setLastName("");
          setCity("");
          setPostercode("");
          setPhone("");
          setAddress("");
          setIsSubmitting(false);
        }
        // setIsSubmitting(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 md:p-10 pt-9 md:pt-10 bg-gray-100 rounded-lg  grid grid-cols-1 lg:grid-cols-3 gap-10 mt-0 md:mt-15">
        <div className="lg:col-span-2">
          {/* <h2 className="text-2xl font-semibold mb-6">Contact Information</h2> */}
          <Grid item xs={12} lg={8}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Contact Information
            </Typography>

            <Box
              component="form"
              onSubmit={handleOrderPlacement}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {/* Email */}
              <TextField
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errorMsg?.email}
                helperText={errorMsg?.email}
              />

              <Typography variant="subtitle1" fontWeight={600} mt={2}>
                Shipping Address
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={!!errorMsg?.firstName}
                    helperText={errorMsg?.firstName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={!!errorMsg?.lastName}
                    helperText={errorMsg?.lastName}
                  />
                </Grid>
              </Grid>

              {/* Address */}
              <TextField
                label="Address"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={!!errorMsg?.address}
                helperText={errorMsg?.address}
              />

              {/* City & Postal Code */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="City"
                    fullWidth
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    error={!!errorMsg?.city}
                    helperText={errorMsg?.city}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Postal Code"
                    type="number"
                    fullWidth
                    value={posterCode}
                    onChange={(e) => setPostercode(e.target.value)}
                    error={!!errorMsg?.posterCode}
                    helperText={errorMsg?.posterCode}
                  />
                </Grid>
              </Grid>

              {/* Phone */}
              <TextField
                label="Phone"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={!!errorMsg?.phone}
                helperText={errorMsg?.phone}
              />

              {/* Error / Success Message */}
              <Snackbar
                open={Boolean(SuccessMsg)}
                autoHideDuration={3000}
                onClose={() => setSuccessMsg(null)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={() => setSuccessMsg(null)}
                  severity={
                    SuccessMsg?.toLowerCase().includes("success") ||
                    SuccessMsg?.toLowerCase().includes("placed")
                      ? "success"
                      : "error"
                  }
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  {SuccessMsg}
                </Alert>
              </Snackbar>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                // color="success"
                fullWidth
                size="large"
                sx={{ mt: 2, fontWeight: 600, py: 1.5 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Place Order"
                )}
              </Button>
            </Box>
          </Grid>
          {/* <form onSubmit={handleOrderPlacement}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              required
            />

            <h2 className="text-lg font-semibold mb-6">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="First name"
                className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <input
              type="text"
              placeholder="Address"
              className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="City"
                className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Poster-code"
                className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={posterCode}
                onChange={(e) => setPostercode(e.target.value)}
                required
              />
            </div>
            <input
              type="text"
              placeholder="Phone"
              className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition"
            >
              {isSubmitting ? (
                <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
              ) : (
                "Place order"
              )}
            </button>
          </form>
          {errorMsg && (
            <p
              className={`fixed top-[110px] left-1/2 transform -translate-x-1/2 ${
                errorMsg.toLowerCase().includes("success") ||
                errorMsg.toLowerCase().includes("placed")
                  ? "bg-green-500"
                  : "bg-red-500"
              } text-white px-4 py-2 rounded shadow-lg transition-all duration-500 ${
                errorMsg
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {errorMsg}
            </p>
          )} */}
        </div>

        <div
          className="border border-gray-200 shadow-sm rounded p-6 bg-gray-50"
          // className="border border-gray-200 shadow-sm rounded-lg p-6 bg-white max-w-lg mx-auto"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
            {image.length > 0 && (
              <div className="w-[280px] h-[280px] sm:w-[200px] sm:h-[200px] flex items-center justify-center border rounded-lg bg-gray-50 overflow-hidden">
                <Image
                  src={image[0]}
                  alt={name}
                  width={280}
                  height={280}
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
              <p className="text-sm text-gray-500 mt-1">Quantity: {quantity}</p>
            </div>
          </div>

          <div className="text-sm mb-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${price}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$5</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${quantity * price}</span>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>30-day risk-free trial & easy returns</span>
            </div>
            {loading ? (
              <p>Loading reviews...</p>
            ) : (
              <div className="flex items-center bg-orange-100 p-1">
                <span className="mr-2">⭐</span>
                <span>Total reviews ({reviews.length})</span>
              </div>
            )}

            <div className="flex items-center">
              <span className="mr-2">🚚</span>
              <span>Free fast shipping Pakistan</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
