"use client";

import Navbar from "../../compoments/navbar";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../store/features/productSlice";
import { getDiscountOffer , removeDicountProduct } from "../../store/features/discountSlice";
import { createDiscountOfferOrder } from "../../store/features/discountOrderSlice";
import Image from "next/image";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
// import OfferCard from "../../compoments/timeOfffer"

export default function MainDashboard() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [activePopup, setActivePopup] = useState(null);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [openOrderId, setOpenOrderId] = useState(null);

  const toggleDropdown = (orderId) => {
    setOpenOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const maxVisible = 1;

  const nextSlide = () => {
    setCurrent((prev) => (prev + maxVisible < discount.length ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev - 1 < 0 ? discount.length - maxVisible : prev - 1
    );
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleAddSalediscountOrderPlace = (productId) => {
    const orderFormData = {
      country,
      city,
      area,
      productId,
    };

    console.log("Sending Order Data:", orderFormData);

    dispatch(createDiscountOfferOrder(orderFormData))
      .then((result) => {
        console.log("API Response:", result.payload);
        router.push("/ordersPage");
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
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

      <div>
        {loading && (
          <div className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-75">
            <FaSpinner className="animate-spin text-5xl text-blue-500" />
          </div>
        )}

        {!loading && (
          <>
            <div className="w-full bg-gradient-to-br from-indigo-800 via-grey-700 to-indigo-900 text-white py-20 px-6 sm:px-16 mt-16 shadow-xl overflow-hidden relative">
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

                <div className="w-full sm:w-1/2 flex justify-center">
                  <Image
                    src="/product-photo.jpg"
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
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Our Products
              </h2>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center text-center transition-transform duration-300 hover:scale-98 hover:shadow-xl border border-gray-200 group relative"
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
                        className="absolute bottom-2 right-2 text-white font-semibold opacity-40 sm:opacity-0 sm:group-hover:opacity-40 transition-all duration-300 ease-in-out bg-blue-500 bg-opacity-30 backdrop-blur-lg px-4 py-2 rounded-md w-32 transform translate-x-0 sm:translate-x-4 sm:group-hover:translate-x-0"
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
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
              🏷️ Sales Discount Offers
            </h2>

            <div className="relative">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {discount.map((item, i) => (
                  // <div key={i} className="min-w-full px-4 flex-shrink-0">
                  //   <div className="bg-white rounded-xl border border-blue-200 p-5 shadow mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-6">
                  //     <div className="w-full md:w-1/2">
                  //       <Image
                  //         src={item.image}
                  //         alt={item.name}
                  //         width={300}
                  //         height={300}
                  //         className="rounded-lg object-cover w-full h-64"
                  //         priority
                  //       />
                  //     </div>

                  //     {user?.isAdmin === true && (
                  //       <div className="relative self-start ml-auto">
                  //         <button
                  //           className="p-2 rounded-full hover:bg-gray-200 transition"
                  //           onClick={() => toggleDropdown(item._id)}
                  //         >
                  //           <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
                  //         </button>

                  //         {openOrderId === item._id && (
                  //           <div className="absolute right-0 top-10 z-20 w-32 bg-white shadow-md rounded-lg p-2 transition-all duration-300 ease-in-out">
                  //             <Link href={`/admin-update-product/${item._id}`}>
                  //               <button className="flex items-center gap-1 w-full text-sm font-semibold text-grey-400 px-3 py-1 rounded-lg hover:bg-blue-200 transition">
                  //                 <PencilSquareIcon className="w-4 h-4 text-gray-500" />
                  //                 Edit
                  //               </button>
                  //             </Link>

                  //             <button
                  //               onClick={() => handleDelete(item._id)}
                  //               className="flex items-center gap-1 w-full text-sm font-semibold text-red-300 px-3 py-1 rounded-lg hover:bg-red-100 transition"
                  //             >
                  //               <TrashIcon className="w-4 h-4 text-gray-350" />
                  //               Delete
                  //             </button>
                  //           </div>
                  //         )}
                  //       </div>
                  //     )}

                  //     <div className="w-full md:w-1/2 text-center md:text-left space-y-3">
                  //       <h3 className="text-2xl font-bold text-blue-500">
                  //         {item.name}
                  //       </h3>
                  //       <div className="text-gray-500 line-through text-lg">
                  //         ${item.price}
                  //       </div>
                  //       <div className="text-3xl font-bold text-blue-500">
                  //         ${item.discountPrice}
                  //       </div>
                  //       <p className="text-sm text-gray-600">
                  //         Limited time offer. Grab it now!
                  //       </p>

                  //       <button
                  //         onClick={() => setActivePopup(item._id)}
                  //         className="mt-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg transition"
                  //       >
                  //         Buy Now
                  //       </button>
                  //     </div>
                  //   </div>
                  // </div>
                  <div key={i} className="min-w-full px-4 flex-shrink-0">
                    <div className="relative bg-white rounded-xl border border-blue-200 p-5 shadow mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-6">
                      {user?.isAdmin === true && (
                        <div className="absolute top-4 right-4">
                          <div className="relative">
                            <button
                              className="p-2 rounded-full hover:bg-gray-200 transition"
                              onClick={() => toggleDropdown(item._id)}
                            >
                              <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
                            </button>

                            {openOrderId === item._id && (
                              <div className="absolute right-0 top-10 z-20 w-32 bg-white shadow-md rounded-lg p-2 transition-all duration-300 ease-in-out">
                                <Link
                                  href={`/admin-update-product/${item._id}`}
                                >
                                  <button className="flex items-center gap-1 w-full text-sm font-semibold text-grey-400 px-3 py-1 rounded-lg hover:bg-blue-200 transition">
                                    <PencilSquareIcon className="w-4 h-4 text-gray-500" />
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  onClick={() =>
                                    handleDeleteDiscountOffer(item._id)
                                  }
                                  className="flex items-center gap-1 w-full text-sm font-semibold text-red-300 px-3 py-1 rounded-lg hover:bg-red-100 transition"
                                >
                                  <TrashIcon className="w-4 h-4 text-gray-350" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="w-full md:w-1/2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={300}
                          height={300}
                          className="rounded-lg object-cover w-full h-64"
                          priority
                        />
                      </div>

                      <div className="w-full md:w-1/2 text-center md:text-left space-y-3">
                        <h3 className="text-2xl font-bold text-blue-500">
                          {item.name}
                        </h3>
                        <div className="text-gray-500 line-through text-lg">
                          ${item.price}
                        </div>
                        <div className="text-3xl font-bold text-blue-500">
                          ${item.discountPrice}
                        </div>
                        {/* <OfferCard item={item.expiresAt} /> */}
                        <p className="text-sm text-gray-600">
                          Limited time offer. Grab it now!
                        </p>
                        {/* <p className="text-xs text-gray-400">
                          Posted on:{" "}
                          {new Date(item.createdAt).toLocaleString()}
                        </p> */}
                        <button
                          onClick={() => setActivePopup(item._id)}
                          className="mt-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg transition"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition"
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
                <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative">
                  <button
                    onClick={() => setActivePopup(null)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                  >
                    ×
                  </button>

                  <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                    Enter Shipping Details
                  </h2>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      // className="w-full p-3 border border-gray-300 rounded-lg"
                      className="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition peer"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      // className="w-full p-3 border border-gray-300 rounded-lg"
                      className="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition peer"
                    />
                    <input
                      type="text"
                      placeholder="Area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      // className="w-full p-3 border border-gray-300 rounded-lg"
                      className="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition peer"
                    />
                  </div>

                  <button
                    onClick={() => handleAddSalediscountOrderPlace(activePopup)}
                    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!loading && (
          <section className="bg-gray-100 px-4 py-16">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">
                About Our Store
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                At{" "}
                <span className="font-semibold text-gray-800">
                  EleganceWear
                </span>
                , we bring you high-quality fashion for every occasion. From
                jewelry to premium watches, we mix elegance with comfort.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {siteDetails.map((item, idx) => (
                <div
                  key={idx}
                  className="relative group p-6 shadow-md overflow-hidden bg-white transition-colors duration-300"
                >
                  <div className="absolute inset-0 bg-blue-100 origin-top-left scale-0 group-hover:scale-100 transition-transform duration-300 ease-out z-0" />

                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
