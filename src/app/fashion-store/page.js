"use client";

import Navbar from "../../compoments/navbar";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../store/features/productSlice";
import {
  getDiscountOffer,
  removeDicountProduct,
} from "../../store/features/discountSlice";
import { createDiscountOfferOrder } from "../../store/features/discountOrderSlice";
import { getAllFeedback } from "../../store/features/feedbackSlice";
import Image from "next/image";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Footer from "../../compoments/footer";
import ScrollTo from "../../compoments/scrolltotop";
import {
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import { RiDoubleQuotesL } from "react-icons/ri";

export default function MainDashboard() {
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [feddBack, setFeedBack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [posterCode, setPostercode] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentFeedback, setCurrentFeedback] = useState(0);
  const [activePopup, setActivePopup] = useState(null);
  const [openOrderId, setOpenOrderId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    dispatch(getAllProducts())
      .then((result) => {
        console.log("API Response:", result.payload);
        setProducts(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err, error);
        setError("Failed to load products.");
        setLoading(false);
      });

    dispatch(getDiscountOffer())
      .then((result) => {
        console.log("API Response:", result.payload);
        setDiscount(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err, error);
        setError("Failed to load products.");
        setLoading(false);
      });

    dispatch(getAllFeedback())
      .then((result) => {
        console.log("API Response:", result.payload);
        setFeedBack(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err, error);
        setError("Failed to load feedbacks.");
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);


  const toggleDropdown = (orderId) => {
    setOpenOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const maxVisible = 1;
  const feddBackmaxVisible = 1;

  const nextSlide = () => {
    setCurrent((prev) => (prev + maxVisible < discount.length ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev - 1 < 0 ? discount.length - maxVisible : prev - 1
    );
  };

  const nextSlideFeedback = () => {
    setCurrentFeedback((prev) =>
      prev + feddBackmaxVisible < feddBack.length ? prev + 1 : 0
    );
  };

  const prevSlideFeedback = () => {
    setCurrentFeedback((prev) =>
      prev - 1 < 0 ? feddBack.length - feddBackmaxVisible : prev - 1
    );
  };


  const handleAddSalediscountOrderPlace = (e, productId) => {
    e.preventDefault();

    const orderFormData = {
      // country,
      // city,
      // area,
      // productId,
      email,
      firstName,
      lastName,
      city,
      posterCode,
      phone,
      address,
      productId,
    };

    console.log("Sending Order Data:", orderFormData);

    dispatch(createDiscountOfferOrder(orderFormData))
      .then((result) => {
        // console.log("API Response:", result.payload);
        // router.push("/ordersPage");
        const message = result.payload?.msg;
        if (message) {
          setErrorMsg(message);
          if (message.toLowerCase().includes("placed")) {
            router.push("/ordersPage");
          }
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setIsSubmitting(false);
      });
  };

  const handleDeleteDiscountOffer = async (orderId) => {
    if (!orderId) {
      console.error("Product ID is missing!");
      return;
    }
    console.log(orderId, "id here");

    dispatch(removeDicountProduct(orderId))
      .then((result) => {
        console.log("API Response:", result.payload);
        dispatch(getDiscountOffer())
          .then((result) => {
            console.log("API Response:", result.payload);
            setDiscount(result.payload.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Fetch Error:", err, error);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Fetch Error:", err, error);
      });
  };

  const siteDetails = [
    {
      title: "Premium Quality",
      description: "Top-grade materials for unmatched style and durability.",
      icon: "✔",
    },
    {
      title: "Fast Delivery",
      description: "Quick and secure delivery at your doorstep.",
      icon: "🚚",
    },
    {
      title: "24/7 Support",
      description: "We’re here to help anytime, any day.",
      icon: "📞",
    },
    {
      title: "Trusted by Thousands",
      description: "Thousands of happy customers around the world.",
      icon: "🌍",
    },
  ];

  return (
    <>
      <Navbar />
      <ScrollTo />
      {loading && (
        <div className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-75">
          <FaSpinner className="animate-spin text-5xl text-blue-500" />
        </div>
      )}

      {!loading && (
        <>
          <div className="w-full bg-gradient-to-br from-indigo-800 via-black to-indigo-900 text-white py-20 px-6 sm:px-16 mt-16 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
              <div className="absolute w-72 h-72 bg-blue-400 opacity-20 rounded-full -top-20 -left-20 animate-ping"></div>
              <div className="absolute w-48 h-48 bg-purple-500 opacity-20 rounded-full top-1/2 left-1/2 animate-pulse"></div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-10">
              <div className="sm:w-1/2 text-center sm:text-left space-y-6">
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                  Discover Your Fashion <br />
                  <span className="text-yellow-300">With Style</span>
                </h1>
                <p className="text-lg text-gray-200">
                  Unveil the latest trends in fashion. Explore curated
                  collections and elevate your wardrobe.
                </p>
                <button className="mt-4 inline-block bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full transition duration-300">
                  Explore Now
                </button>
              </div>

              <div className="w-full sm:w-1/3 flex justify-center">
                <Image
                  src="/fashion-store.png"
                  alt="Fashion Banner"
                  className="w-[90%] max-w-[300px] sm:max-w-[400px] rounded-2xl shadow-2xl animate-fadeInUp"
                  width={400}
                  height={400}
                  priority
                />
              </div>
            </div>
          </div>
          <div className="p-6 mt-16">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
              Our Products
            </h2>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white shadow-lg  p-5 flex flex-col items-center text-center transition-transform duration-300 hover:scale-98 hover:shadow-xl border border-gray-200 group relative"
                  >
                    <span
                      className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full text-white z-10 shadow-md ${
                        product.stock > 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {product.stock > 0
                        ? `In Stock (${product.stock})`
                        : "Out of Stock"}
                    </span>

                    <div className="relative opacity-100 group-hover:opacity-60 w-44 h-44 overflow-hidden rounded-lg border-b-2 border-gray-300 pb-2">
                      <Image
                        src={product.image}
                        alt="Product"
                        width={176}
                        height={176}
                        className="object-cover w-full h-full rounded-lg transition-all duration-300"
                        priority
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mt-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-700 text-sm mt-3 font-semibold">
                      ${product.price}
                    </p>

                    <button
                      className="absolute bottom-2 right-2 bg-blue-600/80 hover:bg-blue-700 opacity-40 sm:opacity-0 sm:group-hover:opacity-40 transition-all duration-300 ease-in-out backdrop-blur-lg px-4 py-2 rounded-md w-36 transform translate-x-0 sm:translate-x-4 sm:group-hover:translate-x-0 text-white text-sm"
                      // className="absolute bottom-2 right-2 text-white font-semibold opacity-40 sm:opacity-0 sm:group-hover:opacity-40 transition-all duration-300 ease-in-out bg-blue-500 bg-opacity-30 backdrop-blur-lg px-4 py-2 rounded-md w-32 transform translate-x-0 sm:translate-x-4 sm:group-hover:translate-x-0"
                      onClick={() => {
                        const queryString = new URLSearchParams({
                          productId: product._id,
                          name: product.name,
                          price: product.price.toString(),
                          category: product.category,
                          stock: product.stock.toString(),
                          description: product.description,
                          image: product.image,
                        }).toString();

                        router.push(`/productDetails?${queryString}`);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No products available.
              </p>
            )}
          </div>
        </>
      )}

      {/* Sales Discount Offers Section */}
      {!loading && (
        <div className="w-full py-8 relative overflow-hidden">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
            🏷️ Sales Discount Offers
          </h2>

          <div className="relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {discount.map((item, i) => (
                <div key={i} className="min-w-full px-4 flex-shrink-10">
                  <div className="relative bg-white  border border-gray-200 p-6 shadow-lg mx-auto max-w-5xl flex flex-col md:flex-row items-center md:items-start gap-8 overflow-hidden">
                    {/* Admin actions */}
                    {user?.isAdmin && (
                      <div className="absolute top-4 right-4">
                        <button
                          className="p-2 rounded-full hover:bg-gray-100 transition"
                          onClick={() => toggleDropdown(item._id)}
                        >
                          <EllipsisVerticalIcon className="w-6 h-6 text-gray-500" />
                        </button>
                        {openOrderId === item._id && (
                          <div className="absolute right-0 mt-2 w-36 bg-white shadow-md rounded-lg p-2">
                            <Link href={`/admin-update-product/${item._id}`}>
                              <button className="flex items-center w-full text-sm text-gray-700 px-3 py-2 hover:bg-gray-100 rounded">
                                <PencilSquareIcon className="w-4 h-4 mr-2" />
                                Edit
                              </button>
                            </Link>
                            <button
                              onClick={() =>
                                handleDeleteDiscountOffer(item._id)
                              }
                              className="flex items-center w-full text-sm text-red-600 px-3 py-2 hover:bg-red-50 rounded"
                            >
                              <TrashIcon className="w-4 h-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Image section */}
                    <div className="w-full md:w-1/2">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={400}
                        height={400}
                        className="rounded-xl object-cover w-full h-72 md:h-full"
                        priority
                      />
                    </div>

                    {/* Details section */}
                    <div className="w-full md:w-1/2 space-y-3 text-center md:text-left flex flex-col items-center md:items-start">
                      <h3 className="text-3xl font-extrabold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500 italic">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                        <span className="text-gray-400 line-through text-xl">
                          ${item.price}
                        </span>
                        <span className="text-4xl font-bold text-blue-600">
                          ${item.discountPrice}
                        </span>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg max-w-xs md:max-w-full">
                        <h4 className="text-lg font-semibold text-blue-500">
                          {item.offerTitle}
                        </h4>
                        <p className="text-sm text-gray-700">
                          {item.offerDescription}
                        </p>
                      </div>

                      {item.expiresAt ? (
                        <div className="text-sm text-red-500">
                          ⏰ Expires on:{" "}
                          {new Date(item.expiresAt).toLocaleDateString()}
                        </div>
                      ) : (
                        <div className="text-sm text-green-500">
                          🎉 Ongoing offer — no expiration!
                        </div>
                      )}

                      <button
                        onClick={() => setActivePopup(item._id)}
                        className="mt-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-gray-900 font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-blue-500 hover:text-white transition"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-blue-500 hover:text-white transition"
            >
              ›
            </button>
          </div>

          {activePopup && !user && (
            <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-[9999]">
              <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative">
                <button
                  onClick={() => setActivePopup(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                >
                  ×
                </button>

                <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  You need to log in to place an order
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

          {activePopup && user && (
          

            <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-[9999]">
              <form
                className="bg-white w-full max-w-md p-7 rounded-lg shadow-2xl relative"
                onSubmit={(e) =>
                  handleAddSalediscountOrderPlace(e, activePopup)
                }
              >
                <button
                  onClick={() => setActivePopup(null)}
                  type="button"
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                >
                  ×
                </button>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mb-3 px-3 py-2 border border-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  required
                />

                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full mb-3 px-3 py-2 border border-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  required
                />

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Postcode"
                    value={posterCode}
                    onChange={(e) => setPostercode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full mb-4 px-3 py-2 border border-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  required
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
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
              )}
            </div>
          )}
        </div>
      )}

      {!loading && (
        <section className="bg-gray-50 px-4 py-16">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              About Our Store
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base md:text-lg">
              At{" "}
              <span className="font-semibold text-gray-900">EleganceWear</span>,
              we bring you high-quality fashion for every occasion. From jewelry
              to premium watches, we mix elegance with comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {siteDetails.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-xl p-6 bg-white shadow hover:shadow-lg transition duration-300 border border-gray-200 hover:border-blue-500"
              >
                <div className="flex items-center justify-center w-14 h-14 mb-4 bg-blue-100 text-pink-600 rounded-full text-2xl transition-transform duration-300 group-hover:rotate-12">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="my-12 flex flex-col items-center justify-center mt-20">
            <h2 className="text-3xl sm:text-3xl font-bold text-center text-blue-900 mb-8">
              Feedback Corner
            </h2>

            <div className="w-full max-w-[850px] overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentFeedback * 100}%)`,
                }}
              >
                {feddBack.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-full flex-shrink-0 flex justify-center px-4"
                  >
                    <div className="group rounded-xl p-6 bg-white shadow hover:shadow-lg transition duration-300 border border-gray-200 hover:border-blue-500">
                      <RiDoubleQuotesL />
                      <h3 className="text-blue-800 font-semibold mt-2 mb-2">
                        {item.userId?.userName || "Anonymous"}
                      </h3>
                      <p className="text-gray-700">
                        <q>{item.feedBackMessage}</q>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={prevSlideFeedback}
                className="bg-white shadow-md p-2 pl-3 pr-3 hover:bg-gray-50"
              >
                &lt;
              </button>
              <button
                onClick={nextSlideFeedback}
                className="bg-white shadow-md p-2 pl-3 pr-3 hover:bg-gray-50"
              >
                &gt;
              </button>
            </div>
          </div>
        </section>
      )}

      {!loading && <Footer />}

    </>
  );
}
