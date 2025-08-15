"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {
  ShoppingCartIcon,
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";
import { Star, Loader, ChevronDown, ChevronUp, CreditCard } from "lucide-react";
import { removeProduct } from "../store/features/productSlice";
import { addCartItem } from "../store/features/productCartSlice";
import {
  getAllReview,
  addProductReview,
  removeReviews,
} from "../store/features/productReviewSlice";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcDeleteRow } from "react-icons/fc";
import { Suspense } from "react";
import RatingBadge from "@/components/RatingBadge";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

export default function ProductDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const category = searchParams.get("category");
  const stock = searchParams.get("stock");
  const description = searchParams.get("description");
  // const image = searchParams.get("image");
  const imageParam = searchParams.get("image");
  const image = imageParam ? JSON.parse(imageParam) : [];

  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [showAddReview, setShowAddReview] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [imagesReview, setImagesReview] = useState("");

  const contentRef = useRef(null);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleDelete = async () => {
    if (!productId) {
      console.error("Product ID is missing!");
      return;
    }

    console.log(productId, "id here");

    try {
      const result = await dispatch(removeProduct(productId));
      console.log("Product deleted successfully:", result);
      router.push("/fashion-store");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToCart = () => {
    const productCartData = {
      productId,
      name,
      price,
      category,
      description,
      image,
      quantity,
    };

    dispatch(addCartItem(productCartData))
      .then((result) => {
        console.log("API Response:", result.payload);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      })
      .finally(() => router.push("/productCart"));
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

    if (imagesReview) {
      productReviewData.append("image", imagesReview);
    }

    dispatch(addProductReview(productReviewData))
      .unwrap()
      .then((newReview) => {
        console.log("Review added successfully:", newReview.data);

        setRating(0);
        setComment("");

        dispatch(getAllReview(productId))
          .then((result) => {
            console.log("API Response:", result.payload);
            setReviews(result.payload.data);
            // setLoading(false);
          })
          .catch((err) => {
            console.error("Fetch Error:", err);
            // setError("Failed to load products.");
            // setLoading(false);
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
      const result = await dispatch(removeReviews(id));
      setReviews((prev) => prev.filter((review) => review._id !== id));

      console.log("Product review deleted successfully:", result);
    } catch (error) {
      console.error("Error deleting review product:", error);
    }
  };

  const handleAddOrder = async () => {
    const queryString = new URLSearchParams({
      productId,
      name,
      price,
      category,
      stock,
      quantity,
      description,
      image: JSON.stringify(image),
    }).toString();

    router.push(`/placeOrder?${queryString}`);
    // router.push("/placeOrder");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    console.log(
      "Product data here",
      productId,
      name,
      price,
      category,
      description,
      image
    );

    dispatch(getAllReview(productId))
      .then((result) => {
        console.log("API Response:", result.payload);
        setReviews(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err, error);
        // setError("Failed to load products.");
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, productId]);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }

    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAddReview, error]);

  const overallRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + Number(review.rating), 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  return (
    <>
      <Suspense>
        <Navbar />

        <div className="max-w-6xl mx-auto mt-18 sm:mt-20 md:mt-32 mb-30 lg:mt-30 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="max-w-9xl mx-auto p-6 flex justify-between items-center p-6 sm:p-7 shadow-md">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 flex-shrink-0">
                {name}
              </h2>
              <button
                onClick={() => router.push("/fashion-store")}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 bg-white shadow rounded-full p-1 transition-transform duration-300 ease-in-out hover:-translate-x-1 hover:shadow-md"
                aria-label="Go Back"
              >
                <IoIosArrowBack className="text-lg" />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>

            <div className="relative">
              {user?.isAdmin === true && (
                <button
                  className="p-2 rounded-full hover:bg-gray-200 transition"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
                </button>
              )}

              <div
                className={`absolute right-0 mt-2 w-32 bg-white shadow-md rounded-lg p-2 transition-all duration-300 ease-in-out transform ${
                  isMenuOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <Link href={`/admin-update-product/${productId}`}>
                  <button className="flex items-center gap-1 w-full text-sm font-semibold text-grey-400 px-3 py-1 rounded-lg hover:bg-blue-200 transition">
                    <PencilSquareIcon className="w-4 h-4 text-gray-500" />
                    Edit
                  </button>
                </Link>

                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 w-full text-sm font-semibold text-red-300 px-3 py-1 rounded-lg hover:bg-red-100 transition"
                >
                  <TrashIcon className="w-4 h-4 text-gray-350" />
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100">
            {image && image.length > 0 && (
              <div className="relative w-full max-w-xl">
                <Swiper
                  spaceBetween={40}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                  className="relative z-10"
                >
                  {image.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <div
                        onClick={() => setPreviewImage(img)}
                        className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden cursor-pointer"
                      >
                        <Image
                          src={img}
                          alt={`${name} - ${idx + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg cursor-pointer"
                          priority
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {previewImage && (
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center px-4"
                onClick={() => setPreviewImage(null)}
              >
                <Image
                  src={previewImage}
                  alt="Full Preview"
                  width={800}
                  height={800}
                  className="rounded-lg object-contain max-w-[90vw] max-h-[90vh]"
                />
              </div>
            )}
            {/* {image && (
              <div
                onClick={() => setPreviewImage(image)}
                className="relative w-full h-96 border-r border-r-gray-500 p-4"
              >
                <Image
                  src={image[0]}
                  alt={name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg cursor-pointer"
                  priority
                />
              </div>
            )}
            {previewImage && (
              <div
                className="fixed inset-0 bg-black/150 backdrop-blur-sm z-[9999] flex items-center justify-center px-4"
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
            )} */}

            <div className="space-y-4">
              <p className="text-lg sm:text-2xl md:text-2xl font-semibold text-gray-700">
                ${price}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Category:</span> {category}
              </p>
              <p
                className={`text-sm font-medium ${
                  stock > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {stock > 0 ? `In Stock (${stock} available)` : "Out of Stock"}
              </p>

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium shadow-sm">
                <span className="mr-2 text-sm font-semibold mt-1">
                  {reviews.length}{" "}
                  <span className="text-xs">
                    {" "}
                    {reviews.length === 1 ? "Review" : "Reviews"}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 text-lg bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1 text-lg bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {user ? (
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg shadow-md hover:bg-indigo-700 transition"
                  >
                    <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    Add to Cart
                  </button>

                  <button
                    onClick={handleAddOrder}
                    disabled={stock <= 0}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg shadow-md transition 
                    ${
                      stock > 0
                        ? "bg-pink-600 text-white hover:bg-pink-700"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                    // className="flex-1 flex items-center justify-center gap-2 bg-pink-600 text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg shadow-md hover:bg-pink-700 transition"
                  >
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                    Buy Now
                  </button>
                </div>
              ) : (
                <p className="text-gray-600 font-semibold">
                  Sign up to add items to your cart or Buy product.
                </p>
              )}
            </div>
          </div>
          <div className=" mb-2 p-6 sm:p-7 space-y-6 bg-gray-100 shadow-md">
            <h3 className="text-base sm:text-xl font-semibold text-gray-800">
              Product Details
            </h3>

            <p className="mt-2 text-gray-600 leading-relaxed">{description}</p>
            <RatingBadge rating={overallRating} />
          </div>

          {user && (
            <div className="mt-2 p-6 sm:p-7 bg-white shadow-md">
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
                    ref={contentRef}
                    onSubmit={handleAddReview}
                    className="p-4 bg-gray-100 rounded-lg shadow-sm mt-4"
                  >
                    <h4 className="font-semibold text-gray-700">
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
                      className="w-full px-4 py-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                        onChange={(e) => setImagesReview(e.target.files[0])}
                        className="hidden"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto mt-4 mb-4 bg-blue-400 font-semibold text-white py-2 px-4 rounded hover:bg-blue-500 text-sm sm:text-base"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                )}
              </motion.div>
              {error && (
                <p className="fixed top-[110px] left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded shadow-md border border-red-300 animate-fade-in">
                  {error}
                </p>
              )}
            </div>
          )}

          {loading ? (
            <div className="mt-5 mb-2 flex justify-center items-center text-gray-600">
              <Loader className="w-6 h-16 animate-spin text-yellow-500" />
              <p className="ml-2">Loading reviews...</p>
            </div>
          ) : (
            <div className="p-5">
              {reviews.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {reviews.map((review, index) => (
                    <div
                      key={index + review._id}
                      className="p-4 mb-4 bg-gray-50 rounded-lg shadow"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-900 flex items-center">
                          <span className="text-blue-600 text-base sm:text-lg md:text-lg font-bold">
                            {review.userId?.userName || "Anonymous"}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            ({index + 1})
                          </span>
                        </h4>
                        <div className="flex items-center">
                          <span className="text-yellow-600 font-bold flex items-center">
                            {review.rating}
                            <Star className="w-5 h-5 ml-1 fill-yellow-500 stroke-none" />
                          </span>
                          {user?.isAdmin && (
                            <button
                              onClick={() => handleRemoveReviews(review._id)}
                              className="ml-4 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full"
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

                      <p className="mt-2 text-sm text-gray-500">
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

        {!loading && <Footer />}
      </Suspense>
    </>
  );
}
