"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../compoments/navbar";
import {
  ShoppingCartIcon,
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";
import { Star, Loader, ChevronDown, ChevronUp, CreditCard } from "lucide-react";
import { removeProduct } from "../../store/features/productSlice";
import { addCartItem } from "../../store/features/productCartSlice";
import {
  getAllReview,
  addProductReview,
  removeReviews,
} from "../../store/features/productReviewSlice";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcDeleteRow } from "react-icons/fc";
// import { ClipLoader } from "react-spinners";

export default function ProductDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const category = searchParams.get("category");
  const stock = searchParams.get("stock");
  const description = searchParams.get("description");
  const image = searchParams.get("image");
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [showAddReview, setShowAddReview] = useState(false);

  const handleStarClick = (value) => {
    setRating(value);
  };

  // const handleInputChange = (e) => {
  //   let value = parseFloat(e.target.value)
  //   if(value >= 1 && value <= 5){
  //     setRating(value)
  //   }
  // }

  const handleDelete = async () => {
    if (!productId) {
      console.error("Product ID is missing!");
      return;
    }

    console.log(productId, "id here");

    try {
      const result = await dispatch(removeProduct(productId));
      console.log("Product deleted successfully:", result);
      router.push("/adminDashboard");
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

    dispatch(addCartItem(productCartData)).then((result) => {
      if (addCartItem.fulfilled.match(result)) {
        router.push("/productCart");
      } else {
        console.log("Failed to add item to cart. Please try again.");
      }
    });
  };

  const handleAddReview = (e) => {
    e.preventDefault();

    const productReviewData = {
      productId,
      rating,
      comment,
    };

    dispatch(addProductReview(productReviewData))
      .unwrap()
      .then((newReview) => {
        console.log("Review added successfully:", newReview.data);

        // const reviewWithUser = {
        //   ...newReview.data,
        //   createdAt: newReview.data.createdAt || new Date().toISOString(),
        // };

        // console.log(reviewWithUser, "new review data here");

        setRating(0);
        setComment("");

        dispatch(getAllReview(productId))
          .then((result) => {
            console.log("API Response:", result.payload);
            setReviews(result.payload.data);
            // setLoading(false);
          })
          .catch((err) => {
            console.error("Fetch Error:", err, error);
            setError("Failed to load products.");
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
      image,
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
        setError("Failed to load products.");
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, productId]);

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 mt-18 sm:mt-20 md:mt-32 lg:mt-30 bg-white rounded-lg shadow-lg border border-gray-300">
        <div className="flex justify-between items-center">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-4xl font-bold text-gray-900 flex-shrink-0">
              {name}
            </h2>
            <button
              onClick={() => router.push("/fashion-store")}
              className="flex items-center text-2xl font-bold text-gray-900 bg-white shadow-md rounded-lg p-2 transition-all duration-300 ease-in-out transform "
              aria-label="Go Back"
            >
              <IoIosArrowBack />
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
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="relative w-full h-96 border-r border-r-gray-500 p-4">
            <Image
              src={image}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              priority
            />
          </div>

          <div className="space-y-4">
            <p className="text-2xl font-semibold text-gray-700">${price}</p>
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

            <div className="flex items-center">
              <span className="ml-2 text-sm text-gray-600">
                ({reviews.length} {reviews.length === 1 ? "Review" : "Reviews"})
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
              // <button
              //   onClick={handleAddToCart}
              //   className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition"
              // >
              //   <ShoppingCartIcon className="w-5 h-5" />
              //   Add to Cart
              // </button>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  Add to Cart
                </button>

                <button
                  onClick={handleAddOrder}
                  className="flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-pink-700 transition"
                >
                  <CreditCard className="w-5 h-5" />
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
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800">
            Product Details
          </h3>
          <p className="mt-2 text-gray-600 leading-relaxed">{description}</p>
        </div>

        {user && (
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Customer Reviews
              </h3>
              <button
                onClick={() => setShowAddReview(!showAddReview)}
                className="text-gray-400 font-semibold hover:text-gray-900 flex items-center"
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
                height: showAddReview ? "auto" : 0,
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {showAddReview && (
                <form
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

                  <button
                    type="submit"
                    className="mt-4 bg-blue-400 font-semibold text-white py-2 px-4 rounded hover:bg-blue-500"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              )}
            </motion.div>
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
                        <span className="text-blue-600 font-bold">
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

                    <p className="mt-2 text-gray-700">{review.comment}</p>

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
          </div>
        )}
      </div>
    </>
  );
}
