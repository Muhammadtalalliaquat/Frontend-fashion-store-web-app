"use client";

import Navbar from "../../compoments/navbar";
import Footer from "../../compoments/footer";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getAllDiscountOffer } from "../../store/features/discountSlice";
import { addCartItem } from "../../store/features/productCartSlice";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import "animate.css";

export default function ShopPage() {
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState([]);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [quantities, setQuantities] = useState({});
  const [activePopupCart, setActivePopupCart] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    dispatch(getAllDiscountOffer())
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
  }, [dispatch]);

  const filteredProducts = discount.filter(
    (product) =>
      (category === "all" || product.SalesCategory === category) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = (id, value) => {
    const num = Math.max(1, Number(value));
    setQuantities((prev) => ({ ...prev, [id]: num }));
  };

  const handleAddToCart = (productId) => {
    const selectedProduct =
      discount.find((product) => product._id === productId) ||
      filteredProducts.find((product) => product._id === productId);

    if (!selectedProduct) {
      console.error("Product not found.");
      return;
    }

    const productCartData = {
      productId: selectedProduct._id,
      name: selectedProduct.name,
      price: selectedProduct.discountPrice,
      category: selectedProduct.SalesCategory,
      description: selectedProduct.offerDescription,
      image: selectedProduct.image,
      quantity: quantities[selectedProduct._id] || 1,
    };

    console.log("From cart data is here:", productCartData);

    dispatch(addCartItem(productCartData))
      .then((result) => {
        console.log("API Response:", result.payload);
        router.push("/productCart");
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      });
  };

  return (
    <>
      <Navbar />

      {loading && (
        <div className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-75">
          <FaSpinner className="animate-spin text-5xl text-blue-500" />
        </div>
      )}

      <div className="container mx-auto p-4 mt-20 mb-30">
        <div className="bg-blue-500 text-white p-8 text-center mb-8 rounded-xl shadow-md animate__animated animate__fadeInDown">
          <h1 className="text-3xl font-bold mb-2">Popular Gift Collections</h1>
          <p className="text-lg">Select your favorite product now on sale</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className=" p-4 space-y-3">
              <h2 className="text-xl font-semibold mb-2">Filters</h2>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full  px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => setCategory("all")}
                className={`w-full px-4 py-2 rounded-lg transition ${
                  category === "all"
                    ? "bg-blue-100 text-black hover:bg-blue-200"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCategory("Watch")}
                className={`w-full px-4 py-2 rounded-lg transition ${
                  category === "Watch"
                    ? "bg-blue-100 text-black hover:bg-blue-200"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Men Watches
              </button>
              <button
                onClick={() => setCategory("Women watch")}
                className={`w-full px-4 py-2 rounded-lg transition ${
                  category === "Women watch"
                    ? "bg-blue-100 text-black hover:bg-blue-200"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Women Watches
              </button>
              <button
                onClick={() => setCategory("Jewellery")}
                className={`w-full px-4 py-2 rounded-lg transition ${
                  category === "Jewellery"
                    ? "bg-blue-100 text-black hover:bg-blue-200"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Jewellery
              </button>
            </div>
          </div>

          {!loading &&
            (filteredProducts.length > 0 ? (
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((item) => (
                  <div
                    key={item._id}
                    className="group rounded-xl p-6 shadow hover:shadow-lg transition duration-300 border border-gray-200 hover:border-blue-500"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      // className="backdrop-blur-lg  max-w-7xl w-full mx-4 md:mx-10 p-10 md:p-2 grid grid-cols-1 md:grid-cols-2 gap-12"
                    >
                      <div className="relative group w-full max-w-sm pb-3 rounded-xl shadow-lg border border-gray-200 p-0 sm:pb-0 bg-cover bg-center bg-no-repeat">
                        {activePopupCart === item._id && !user && (
                          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center px-3 z-[9999]">
                            <div className="bg-white w-full max-w-sm sm:max-w-md p-4 sm:p-6  shadow-2xl relative">
                              <button
                                onClick={() => setActivePopupCart(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                              >
                                ×
                              </button>

                              <h2 className="font-medium text-gray-800 p-3 mb-3 text-center">
                                You need to log in to add items to your cart
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

                        {activePopupCart === item._id && user && (
                          <div className="absolute top-14 right-2 sm:right-4 bg-white shadow-xl rounded-2xl p-4 z-40 w-11/12 sm:w-52 flex flex-col items-center border border-gray-200 transition-all duration-300">
                            <label className="text-sm mb-1">Quantity</label>
                            <input
                              type="number"
                              min="1"
                              max={item.inStock}
                              value={quantities[item._id] || 1}
                              onChange={(e) =>
                                handleQuantityChange(item._id, e.target.value)
                              }
                              className="mb-2 w-16 text-center border border-gray-300 rounded px-2 py-1"
                            />
                            <button
                              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm w-full"
                              onClick={() => handleAddToCart(item._id)}
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={() => setActivePopupCart(null)}
                              className="text-xs text-gray-500 mt-1 hover:underline"
                            >
                              Cancel
                            </button>
                          </div>
                        )}

                        {/* <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 items-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 z-20"> */}

                        {activePopup === item._id && !user && (
                          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center px-3 z-[9999]">
                            <div className="bg-white w-full max-w-sm sm:max-w-md p-4 sm:p-6 shadow-2xl relative">
                              <button
                                onClick={() => setActivePopup(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                              >
                                ×
                              </button>

                              <h2 className="font-medium text-gray-800 p-3 mb-3 text-center">
                                You need to log in to Buy this product.
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

                        {activePopup === item._id && user && (
                          <div className="absolute top-14 right-2 sm:right-4 bg-white shadow-xl rounded-2xl p-4 z-40 w-11/12 sm:w-52 flex flex-col items-center border border-gray-200 transition-all duration-300">
                            <label className="text-sm mb-1">Quantity</label>
                            <input
                              type="number"
                              min="1"
                              max={item.inStock}
                              value={quantities[item._id] || 1}
                              onChange={(e) =>
                                handleQuantityChange(item._id, e.target.value)
                              }
                              className="mb-2 w-16 text-center border border-gray-300 rounded px-2 py-1"
                            />
                            <button
                              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm w-full"
                              onClick={() => {
                                const quantity = quantities[item._id] || 1;
                                const queryString = new URLSearchParams({
                                  productId: item._id,
                                  name: item.name,
                                  price: item.discountPrice.toString(),
                                  category: item.SalesCategory,
                                  stock: item.inStock.toString(),
                                  description: item.offerTitle,
                                  image: item.image,
                                  quantity: quantity.toString(),
                                }).toString();
                                router.push(
                                  `/discountProductInfo?${queryString}`
                                );
                              }}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setActivePopup(null)}
                              className="text-xs text-gray-500 mt-1 hover:underline"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                        {/* </div> */}
                      </div>

                      <Image
                        width={500}
                        height={500}
                        src={item.image}
                        alt={item.image}
                        className="w-full h-60 object-cover rounded-lg mb-4"
                      />

                      <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-700 text-lg font-semibold">
                          {item.name}
                        </p>
                        <button
                          onClick={() => setActivePopupCart(item._id)}
                          // className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-100 hover:bg-blue-200 p-2 rounded-full shadow-md cursor-pointer"
                          className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 bg-blue-100 hover:bg-blue-200 p-2 rounded-full shadow-md cursor-pointer"
                        >
                          <LiaShoppingCartSolid
                            size={20}
                            className="text-blue-600"
                          />
                        </button>
                      </div>

                      <p className="text-lg flex justify-between items-center mb-2">
                        <span className=" text-blue-600 font-bold mb-1">
                          ${item.discountPrice}
                        </span>
                        <span className="line-through text-gray-400 ml-2">
                          ${item.price}
                        </span>
                      </p>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="mb-1">{item.SalesCategory}</h3>
                        <p className="text-green-600 text-sm mb-1">
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.offerTitle}
                      </p>
                      <button
                        // className="bg-blue-500 font-bold text-white w-full py-2 rounded-full hover:bg-blue-600"
                        className="bg-blue-500 font-bold text-white w-full py-1.5 text-sm rounded-full hover:bg-blue-600 sm:py-2 sm:text-base"
                        onClick={() => setActivePopup(item._id)}
                      >
                        Buy it now
                      </button>

                      {/* <button
                        className="bg-blue-600/80 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm backdrop-blur-md w-36"
                        onClick={() => {
                          const queryString = new URLSearchParams({
                            productId: item._id,
                            name: item.name,
                            price: item.discountPrice.toString(),
                            category: item.SalesCategory,
                            stock: item.inStock.toString(),
                            description: item.offerTitle,
                            image: item.image,
                          }).toString();
                          router.push(`/productDetails?${queryString}`);
                        }}
                      >
                        View Details
                      </button> */}
                    </motion.div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No discounts available</p>
            ))}
        </div>
      </div>

      {!loading && <Footer />}
    </>
  );
}
