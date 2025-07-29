"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchAllProductShow } from "../../store/features/productSlice";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { addCartItem } from "../../store/features/productCartSlice";
import { addWishListItem } from "../../store/features/wishListSlice";
import FashionStoreLoader from "../../components/storeLoader";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Image from "next/image";
import Link from "next/link";
import { TiArrowSortedUp } from "react-icons/ti";
import { motion } from "framer-motion";
import { AiOutlineHeart } from "react-icons/ai";

export default function Products() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [quantities, setQuantities] = useState({});
  const [activePopupCart, setActivePopupCart] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [wishListPopup, setWishListPopup] = useState(null);
  const [error, setError] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }

    dispatch(fetchAllProductShow())
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
  }, [dispatch, error]);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        (category === "all" || product.category === category) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSortedProducts(filtered);
  }, [products, category, searchTerm]);

  const handleQuantityChange = (id, value) => {
    const num = Math.max(1, Number(value));
    setQuantities((prev) => ({ ...prev, [id]: num }));
  };

  const handleAddToCart = (productId) => {
    const selectedProduct = products.find(
      (product) => product._id === productId
    );

    if (!selectedProduct) {
      console.error("Product not found.");
      return;
    }

    const productCartData = {
      productId: selectedProduct._id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      category: selectedProduct.category,
      description: selectedProduct.description,
      image: selectedProduct.image,
      quantity: quantities[selectedProduct._id] || 1,
    };

    dispatch(addCartItem(productCartData))
      .then((result) => {
        console.log("API Response:", result.payload);
        router.push("/productCart");
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      });
  };

  const handleAddToWishlist = (productId) => {
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    if (!selectedProduct) {
      console.error("Product not found.");
      return;
    }

    const productCartData = {
      productId: selectedProduct._id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      category: selectedProduct.category,
      description: selectedProduct.description,
      image: selectedProduct.image,
    };

    dispatch(addWishListItem(productCartData))
      .then((result) => {
        console.log("API Response:", result.payload);
        const msg = result.payload?.msg;

        if (msg) {
          setError(msg);
        }
        // setWishlistItems(result.payload);
        // router.push("/productCart");
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      });
  };

  const toggleSortByPrice = () => {
    const sorted = [...sortedProducts].sort((a, b) => {
      return sortOrder === "desc" ? a.price - b.price : b.price - a.price;
    });
    setSortedProducts(sorted);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const categories = [
    { name: "All Categories", value: "all" },
    { name: "Jewelry", value: "Jewellery" },
    { name: "Men's & Women's Watches", value: "Watch" },
  ];

  return (
    <>
      <Navbar />
      <section className="px-6 py-10 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <button
              onClick={toggleSortByPrice}
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2
              border border-gray-300 sm:border-0
              shadow-sm sm:shadow-none
              text-gray-700 hover:text-white hover:bg-gray-900
              font-medium px-4 py-2 rounded-full transition duration-200
              text-sm sm:text-base w-full sm:w-auto"
            >
              <span className="flex items-center gap-1">
                Sort by Price:
                {/* {sortOrder === "desc" ? "High" : "Low"} */}
                <motion.div
                  animate={{ rotate: sortOrder === "asc" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TiArrowSortedUp className="text-xl" />
                </motion.div>
              </span>
            </button>

            <input
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Listbox value={category} onChange={setCategory}>
              <div className="relative w-full sm:w-1/3">
                <Listbox.Button className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700">
                  {categories.find((c) => c.value === category)?.name}
                  <ChevronDownIcon className="w-5 h-5 absolute right-3 top-3 text-gray-500" />
                </Listbox.Button>
                <Listbox.Options className="absolute z-40 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg">
                  {categories.map((item, idx) => (
                    <Listbox.Option
                      key={idx}
                      value={item.value}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-2 ${
                          active ? "bg-blue-100 text-blue-800" : "text-gray-700"
                        }`
                      }
                    >
                      {item.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          {loading ? (
            <FashionStoreLoader product={products} />
          ) : sortedProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product._id}
                  className="group relative bg-white rounded-xl shadow-md p-4 hover:bg-gray-50 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="relative group w-full max-w-sm pb-3 rounded-xl overflow-hidden shadow-lg border border-gray-200 p-2 sm:pb-4 pb-24 bg-cover bg-center bg-no-repeat">
                    <button
                      onClick={() => setActivePopupCart(product._id)}
                      className="absolute top-3 right-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 z-30 bg-blue-100 hover:bg-blue-200 p-2 rounded-full shadow-md cursor-pointer"
                    >
                      <LiaShoppingCartSolid
                        size={24}
                        className="text-blue-600"
                      />
                    </button>

                    {activePopupCart === product._id && !user && (
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

                    {activePopupCart === product._id && user && (
                      <div className="absolute top-14 right-3 bg-white shadow-lg rounded-lg p-4 z-40 w-40 flex flex-col items-center">
                        <label className="text-sm mb-1">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          max={product.stock}
                          value={quantities[product._id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(product._id, e.target.value)
                          }
                          className="mb-2 w-16 text-center border border-gray-300 rounded px-2 py-1"
                        />
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm w-full"
                          onClick={() => handleAddToCart(product._id)}
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

                    <div className="absolute top-2 left-4 z-40">
                      <button
                        onClick={() => {
                          if (!user) {
                            setWishListPopup(product._id);
                          } else {
                            handleAddToWishlist(product._id);
                          }
                        }}
                        className="bg-white text-red-500 hover:text-white hover:bg-red-400 
                        transition-all duration-300 ease-in-out rounded-full p-2 
                        opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <AiOutlineHeart className="w-5 h-5" />
                      </button>
                    </div>

                    {wishListPopup === product._id && !user && (
                      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center px-3 z-[9999]">
                        <div className="bg-white w-full max-w-sm sm:max-w-md p-4 sm:p-6 shadow-2xl relative">
                          <button
                            onClick={() => setWishListPopup(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                          >
                            ×
                          </button>
                          <h2 className="font-medium text-gray-800 p-3 mb-3 text-center">
                            You need to log in to add items to your wishlist
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

                    {error && (
                      <p
                        className={`fixed top-[110px] left-1/2 transform -translate-x-1/2 z-50
                        ${
                          error.toLowerCase().includes("success") ||
                          error.toLowerCase().includes("already in wishlist")
                            ? "bg-blue-500"
                            : "bg-red-400"
                        }
                        text-white px-4 py-2 max-w-xs w-[90%] text-center rounded shadow-md
                        transition-all duration-500 ease-in-out
                        ${
                          error
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2"
                        }
                      `}
                      >
                        {error}
                      </p>
                    )}

                    <div className="w-full h-44 sm:mb-2">
                      <Image
                        src={product.image}
                        alt="Product"
                        width={300}
                        height={176}
                        className="w-full h-full object-contain rounded-lg"
                        priority
                      />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                      {product.name}
                    </h2>
                    <p className="text-gray-500 text-sm">{product.category}</p>
                    <p className="text-blue-600 font-bold mt-1">
                      ${product.price}
                    </p>

                    <div className="absolute inset-0 bg-white/30 backdrop-blur-md opacity-0 group-hover:opacity-70 transition-all duration-300 z-10" />

                    {activePopup === product._id && !user && (
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

                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 items-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 z-20">
                      <button
                        className="bg-blue-600/80 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm backdrop-blur-md w-36"
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

                      <button
                        onClick={() => setActivePopup(product._id)}
                        className="bg-green-600/80 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm backdrop-blur-md w-36"
                      >
                        Buy Now
                      </button>

                      {activePopup === product._id && user && (
                        <div className="absolute bottom-14 bg-white shadow-lg rounded-lg p-4 z-30 w-40 flex flex-col items-center">
                          <label className="text-sm mb-1">Quantity</label>
                          <input
                            type="number"
                            min="1"
                            max={product.stock}
                            value={quantities[product._id] || 1}
                            onChange={(e) =>
                              handleQuantityChange(product._id, e.target.value)
                            }
                            className="mb-2 w-16 text-center border border-gray-300 rounded px-2 py-1"
                          />
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm w-full"
                            onClick={() => {
                              const quantity = quantities[product._id] || 1;
                              const queryString = new URLSearchParams({
                                productId: product._id,
                                name: product.name,
                                price: product.price.toString(),
                                category: product.category,
                                stock: product.stock.toString(),
                                description: product.description,
                                image: product.image,
                                quantity: quantity.toString(),
                              }).toString();
                              router.push(`/placeOrder?${queryString}`);
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
