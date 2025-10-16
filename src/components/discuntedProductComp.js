"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createDiscountOfferOrder } from "../store/features/discountOrderSlice";
import {
  getAllReview,
  addProductReview,
  removeReviews,
} from "../store/features/productReviewSlice";
import { formatDistanceToNow } from "date-fns";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useDispatch } from "react-redux";
import { Star, Loader, ChevronDown, ChevronUp } from "lucide-react";
import RatingBadge from "@/components/RatingBadge";
import { FcDeleteRow } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";

export default function DiscountProductComp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const quantity = searchParams.get("quantity");
  const image = searchParams.get("image");
  const productId = searchParams.get("productId");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [posterCode, setPostercode] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [SuccessMsg, setSuccessMsg] = useState("");
  // const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    
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
    
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [showAddReview]);

  const handleAddSalediscountOrderPlace = (e) => {
    e.preventDefault();

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

    dispatch(createDiscountOfferOrder(orderFormData))
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
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setIsSubmitting(false);
      });
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleAddReview = (e) => {
    e.preventDefault();

    if (!rating) {
      setError("Please add a product rating");
      return;
    }

    const productReviewData = new FormData();
    productReviewData.append("productId", productId);
    productReviewData.append("rating", rating);
    productReviewData.append("comment", comment);

    if (images) {
      productReviewData.append("image", images);
    }

    dispatch(addProductReview(productReviewData))
      .unwrap()
      .then((newReview) => {
        console.log("Review added successfully:", newReview.data);

        const message = newReview.data?.msg;
        if (message) {
          setErrorMsg(message);
          if (message.toLowerCase().includes("placed")) {
            //  router.push("/ordersPage");
          }
        }

        setRating(0);
        setComment("");

        dispatch(getAllReview(productId))
          .then((result) => {
            console.log("API Response:", result.payload);
            setReviews(result.payload.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Fetch Error:", err);
            // setError("Failed to load products.");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Error adding review:", err);
      });
  };

  const handleRemoveReviews = async (id) => {
    if (!id) {
      console.error("Review ID (_id) is missing!");
      return;
    }

    console.log(id, "Deleting review with this ID");

    try {
      const result = dispatch(removeReviews(id));
      setReviews((prev) => prev.filter((review) => review._id !== id));

      console.log("Product review deleted successfully:", result);
    } catch (error) {
      console.error("Error deleting review product:", error);
    }
  };

  const overallRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + Number(review.rating), 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 md:p-10 bg-gray-100 rounded-lg  grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 mb-10">
        <div className="lg:col-span-2">
          <Grid item xs={12} lg={8}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Contact Information
            </Typography>

            <Box
              component="form"
              onSubmit={handleAddSalediscountOrderPlace}
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
              {SuccessMsg && (
                <div
                  className={`fixed top-16 left-1/2 transform -translate-x-1/2 
              w-[90%] max-w-md sm:max-w-lg md:max-w-xl2 
              px-4 sm:px-6 py-3 sm:py-4 
              rounded-lg shadow-lg text-white text-sm sm:text-base font-medium 
              transition-all duration-500 z-50 
              ${
                SuccessMsg.toLowerCase().includes("success") ||
                SuccessMsg.toLowerCase().includes("placed")
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex-1 break-words">{SuccessMsg}</span>
                    <button
                      onClick={() => setSuccessMsg(null)}
                      className="ml-2 text-white hover:text-gray-200 focus:outline-none text-lg"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

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
          {/* <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

          <form onSubmit={handleAddSalediscountOrderPlace}>
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

          {/* <div className="mt-4 text-sm">
                  <a href="/cart" className="text-blue-600 hover:underline">
                    Return to cart
                  </a>
                </div> */}
        </div>

        <div className="border border-gray-200 shadow-sm rounded p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
            <Image
              src={image}
              alt={name}
              width={180}
              height={180}
              className="object-cover w-[280px] h-[280px] sm:w-[200px] sm:h-[200px] flex items-center justify-center border rounded-lg bg-gray-50 overflow-hidden"
            />
            <div>
              <h3 className="text-sm font-semibold">{name}</h3>
              <p className="text-sm text-gray-500">Qty: {quantity}</p>
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

          <div className="pt-7 sm:pt-23">
            <RatingBadge rating={overallRating} />
          </div>
        </div>

        <div className="w-full mx-auto lg:col-span-3 p-6 mt-1 sm:mt-20 md:mt-32 lg:mt-6 border border-gray-300">
          {user && (
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <h3 className="text-base sm:text-xl font-semibold text-gray-800">
                  Customer Reviews
                </h3>

                <button
                  onClick={() => setShowAddReview(!showAddReview)}
                  className="text-sm sm:text-lx text-gray-400 font-semibold hover:text-gray-900 flex items-center"
                >
                  {showAddReview ? "Hide Review" : "Add Review"}
                  {showAddReview ? (
                    <ChevronUp className="w-5 h-5 ml-1" />
                  ) : (
                    <ChevronDown className="w-5 h-5 ml-1" />
                  )}
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: showAddReview ? 1 : 0,
                  height: showAddReview ? contentHeight : 0,
                }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {showAddReview && (
                  <form
                    onSubmit={handleAddReview}
                    ref={contentRef}
                    className="p-4 bg-gray-100 rounded-lg shadow-sm mt-4"
                  >
                    <h4 className="font-semibold text-gray-700 text-sm md:text-lg lg:text-lg">
                      Write a Review
                    </h4>

                    <div className="flex space-x-1 my-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={22}
                          className={
                            star <= rating
                              ? "text-yellow-500 cursor-pointer"
                              : "text-gray-300 cursor-pointer"
                          }
                          onClick={() => handleStarClick(star)}
                        />
                      ))}
                    </div>

                    <label className="block text-gray-700">Comment:</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-4 py-3 mt-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      placeholder="Write your review here..."
                      required
                    />

                    <div className="mb-2 mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Product Image
                      </label>

                      <label
                        htmlFor="uploadImage"
                        className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 bg-gray-50 text-gray-600 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 mb-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0 0l-3-3m3 3l3-3M4 8h16"
                          />
                        </svg>
                        <span className="text-sm">Click to upload image</span>
                      </label>

                      <input
                        id="uploadImage"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) => setImages(e.target.files[0])}
                        className="hidden"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto mt-4 mb-4 bg-blue-400 font-semibold text-white py-2 px-4 rounded hover:bg-blue-500 text-sm sm:text-base"
                      // className="mt-4 bg-blue-700 font-semibold text-white text-sm md:text-sm lg:text-sm py-2 px-4 rounded hover:bg-blue-800"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                )}
              </motion.div>
              {/* {error && (
                <p className="fixed top-[110px] left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded shadow-md border border-red-300 animate-fade-in">
                  {error}
                </p>
              )} */}
            </div>
          )}

          {/* Reviews Section */}

          {loading ? (
            <div className="mt-4 flex justify-center items-center text-gray-600">
              <Loader className="w-6 h-6 animate-spin text-yellow-500" />
              <p className="ml-2">Loading reviews...</p>
            </div>
          ) : (
            <div className="mt-8">
              {/* <h3 className="text-xl font-semibold text-gray-800">
              Customer Reviews
            </h3> */}

              {reviews.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {reviews.map((review, index) => (
                    <div
                      key={index + review._id}
                      className="p-4  shadow-sm bg-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900 flex items-center">
                          <span className="text-blue-700 font-bold">
                            {review.userId?.userName || "Anonymous"}
                          </span>
                          <span className="text-gray-500 ml-2 text-sm">
                            ({index + 1})
                          </span>
                        </h4>
                        <div className="flex items-center">
                          <span className="text-yellow-600 font-bold flex items-center">
                            {review.rating}
                            <Star className="w-5 h-5 ml-1 fill-yellow-500 stroke-none" />
                          </span>

                          {user?.isAdmin === true && (
                            <button
                              onClick={() => handleRemoveReviews(review._id)}
                              type="button"
                              className="ml-4 p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-all"
                              disabled={loading}
                            >
                              {loading ? (
                                "Deleting..."
                              ) : (
                                <FcDeleteRow size={20} />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center flex-wrap gap-2 mb-2 text-gray-700">
                        <p>{review.comment}</p>

                        {review.image && (
                          <button
                            onClick={() => setPreviewImage(review.image)}
                            className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
                          >
                            <span>View Image</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10l4.553 2.276A1 1 0 0120 13.118V17a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.882a1 1 0 01.447-.842L9 10m6 0V5a3 3 0 10-6 0v5m6 0H9"
                              />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* 🕒 Display Time Ago */}
                      <p className="mt-1 text-gray-500 text-sm">
                        {review.createdAt
                          ? formatDistanceToNow(new Date(review.createdAt), {
                              addSuffix: true,
                            })
                          : "Date not available"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-gray-500 text-center">
                  No reviews yet. Be the first to review!
                </p>
              )}

              {previewImage && (
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center px-4"
                  onClick={() => setPreviewImage(null)}
                >
                  <div className="">
                    <Image
                      src={previewImage}
                      alt="Full Preview"
                      width={800}
                      height={800}
                      className="rounded-lg object-contain max-w-[90vw] max-h-[90vh]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {!loading && <Footer />}
    </>
  );
}
