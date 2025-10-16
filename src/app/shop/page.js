"use client";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getAllDiscountOffer } from "../../store/features/discountSlice";
import { addCartItem } from "../../store/features/productCartSlice";
import { LiaShoppingCartSolid } from "react-icons/lia";
import FashionStoreLoader from "../../components/storeLoader";
import ScrollTo from "../../components/scrolltotop";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import "animate.css";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

export default function ShopPage() {
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState([]);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [activePopupCart, setActivePopupCart] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [showFullId, setShowFullId] = useState(null);


  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    setMounted(true);

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

  if (!mounted) {
    return null;
  }

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
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      })
      .finally(() => router.push("/productCart"));
  };

  return (
    <>
      <Navbar />
      <ScrollTo />

      {loading && <FashionStoreLoader product={discount} />}

      <div className="container mx-auto p-4 mt-6 mb-20">
        {/* <div className="bg-blue-500 text-white p-8 text-center mb-8 rounded-xl shadow-md animate__animated animate__fadeInDown">
          <h1 className="text-3xl font-bold mb-2">Popular Gift Collections</h1>
          <p className="text-lg">Select your favorite product now on sale</p>
        </div> */}
        {/* <div className="relative mb-12 px-6 py-8 text-center rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 animate__animated animate__fadeInDown">     
          <div className="absolute inset-0 opacity-20 bg-[url('/patterns/mesh.svg')] bg-cover bg-center"></div>
          <div className="relative z-10">
            <h1 className="text-2xl md:text-4xl font-extrabold mb-4 text-white tracking-tight drop-shadow-md">
              Popular Gift Collections
            </h1>
            <p className="text-lg md:text-2xl font-medium opacity-90 text-gray-100 max-w-2xl mx-auto">
              Discover hand-picked items and grab your favorite product now on
              sale 🎁
            </p>
          </div>
        </div> */}
        <Box
          sx={{
            position: "relative",
            mb: 6,
            px: { xs: 3, sm: 6 },
            py: { xs: 2, sm: 4 },
            textAlign: "center",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: 6,
            background: "linear-gradient(90deg, #1e3a8a, #4338ca, #7e22ce)",
            animation: "fadeInDown 1s ease",
            "@keyframes fadeInDown": {
              from: { opacity: 0, transform: "translateY(-20px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {/* Subtle background texture */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: 0.15,
              backgroundImage: "url('/patterns/mesh.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Content */}
          <Box sx={{ position: "relative", zIndex: 10 }}>
            <Typography
              variant="h3"
              sx={{
                color: "#fff",
                fontWeight: 800,
                mb: 2,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                fontSize: { xs: "1.3rem", md: "2.5rem" },
              }}
            >
              Popular Gift Collections
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.9)",
                maxWidth: "700px",
                mx: "auto",
                fontWeight: 500,
                fontSize: { xs: "0.8rem", md: "1.3rem" },
              }}
            >
              Discover hand-picked items and grab your favorite product now on
              sale 🎁
            </Typography>
          </Box>
        </Box>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Box sx={{ gridColumn: { md: "span 1" } }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                bgcolor: "grey.50",
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                color="text.primary"
                sx={{ mb: 1 }}
              >
                Filters
              </Typography>

              <TextField
                fullWidth
                placeholder="Search products..."
                variant="outlined"
                size="small"
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#ccc" },
                    "&:hover fieldset": { borderColor: "black" },
                    "&.Mui-focused fieldset": { borderColor: "black" },
                  },
                }}
              />

              <Stack spacing={1.5}>
                {[
                  { label: "All", value: "all" },
                  { label: "Men Watches", value: "Watch" },
                  { label: "Women Watches", value: "Women watch" },
                  { label: "Jewellery", value: "Jewellery" },
                ].map((item) => (
                  <Button
                    key={item.value}
                    variant={category === item.value ? "contained" : "outlined"}
                    onClick={() => setCategory(item.value)}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      fontWeight: 600,
                      bgcolor:
                        category === item.value ? "primary.light" : "grey.100",
                      color: category === item.value ? "#fff" : "text.primary",
                      borderColor:
                        category === item.value ? "transparent" : "grey.300",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor:
                          category === item.value ? "primary.main" : "grey.200",
                        color:
                          category === item.value ? "#fff" : "text.primary",
                      },
                    }}
                    fullWidth
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            </Paper>
          </Box>
          {/* <div className="md:col-span-1">
            <div className=" p-4 space-y-3 bg-gray-100">
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
          </div> */}

          {!loading &&
            (filteredProducts.length > 0 ? (
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((item) => (
                  <div
                    key={item._id}
                    className="group rounded-xl p-6 shadow hover:shadow-lg transition duration-300 bg-gray-100 border border-gray-200 hover:border-blue-500"
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
                          <Paper
                            elevation={8}
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, 50%)",
                              width: { xs: "85%", sm: 220 },
                              p: 3,
                              borderRadius: 3,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              bgcolor: "background.paper",
                              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                              border: "1px solid",
                              borderColor: "grey.200",
                              transition: "all 0.3s ease",
                              zIndex: 40,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                mb: 1,
                                fontWeight: 600,
                                color: "text.primary",
                              }}
                            >
                              Quantity
                            </Typography>

                            <TextField
                              type="number"
                              size="small"
                              inputProps={{
                                min: 1,
                                max: item.inStock,
                                style: { textAlign: "center" },
                              }}
                              value={quantities[item._id] || 1}
                              onChange={(e) =>
                                handleQuantityChange(item._id, e.target.value)
                              }
                              sx={{
                                width: 80,
                                mb: 2,
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                            />

                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                borderRadius: 2,
                                py: 0.6,
                                mb: 1,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                                },
                              }}
                              onClick={() => handleAddToCart(item._id)}
                            >
                              Add to Cart
                            </Button>

                            <Button
                              onClick={() => setActivePopupCart(null)}
                              sx={{
                                fontSize: "0.75rem",
                                color: "text.secondary",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              Cancel
                            </Button>
                          </Paper>

                          // <div className="absolute top-14 right-2 sm:right-4 bg-white shadow-xl rounded-2xl p-4 z-40 w-11/12 sm:w-52 flex flex-col items-center border border-gray-200 transition-all duration-300">
                          //   <label className="text-sm mb-1">Quantity</label>
                          //   <input
                          //     type="number"
                          //     min="1"
                          //     max={item.inStock}
                          //     value={quantities[item._id] || 1}
                          //     onChange={(e) =>
                          //       handleQuantityChange(item._id, e.target.value)
                          //     }
                          //     className="mb-2 w-16 text-center border border-gray-300 rounded px-2 py-1"
                          //   />
                          //   <button
                          //     className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm w-full"
                          //     onClick={() => handleAddToCart(item._id)}
                          //   >
                          //     Add to Cart
                          //   </button>
                          //   <button
                          //     onClick={() => setActivePopupCart(null)}
                          //     className="text-xs text-gray-500 mt-1 hover:underline"
                          //   >
                          //     Cancel
                          //   </button>
                          // </div>
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
                          <Paper
                            elevation={6}
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, 50%)",
                              width: { xs: "85%", sm: 220 },
                              p: 3,
                              borderRadius: 3,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              bgcolor: "background.paper",
                              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                              border: "1px solid",
                              borderColor: "grey.200",
                              transition: "all 0.3s ease",
                              zIndex: 40,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ mb: 1, fontWeight: 500 }}
                            >
                              Quantity
                            </Typography>

                            <TextField
                              type="number"
                              size="small"
                              inputProps={{
                                min: 1,
                                max: item.stock,
                                style: { textAlign: "center" },
                              }}
                              value={quantities[item._id] || 1}
                              onChange={(e) =>
                                handleQuantityChange(item._id, e.target.value)
                              }
                              sx={{ width: 70, mb: 2 }}
                            />

                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              sx={{
                                textTransform: "none",
                                borderRadius: 1,
                                py: 0.6,
                              }}
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
                            </Button>

                            <Button
                              onClick={() => setActivePopup(null)}
                              sx={{
                                fontSize: "0.75rem",
                                color: "text.secondary",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              Cancel
                            </Button>
                          </Paper>
                          // <div className="absolute top-14 right-2 sm:right-4 bg-white shadow-xl rounded-2xl p-4 z-40 w-11/12 sm:w-52 flex flex-col items-center border border-gray-200 transition-all duration-300">
                          //   <label className="text-sm mb-1">Quantity</label>
                          //   <input
                          //     type="number"
                          //     min="1"
                          //     max={item.inStock}
                          //     value={quantities[item._id] || 1}
                          //     onChange={(e) =>
                          //       handleQuantityChange(item._id, e.target.value)
                          //     }
                          //     className="mb-2 w-16 text-center border border-gray-300 rounded px-2 py-1"
                          //   />
                          //   <button
                          //     className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm w-full"
                          //     onClick={() => {
                          //       const quantity = quantities[item._id] || 1;
                          //       const queryString = new URLSearchParams({
                          //         productId: item._id,
                          //         name: item.name,
                          //         price: item.discountPrice.toString(),
                          //         category: item.SalesCategory,
                          //         stock: item.inStock.toString(),
                          //         description: item.offerTitle,
                          //         image: item.image,
                          //         quantity: quantity.toString(),
                          //       }).toString();
                          //       router.push(
                          //         `/discountProductInfo?${queryString}`
                          //       );
                          //     }}
                          //   >
                          //     Confirm
                          //   </button>
                          //   <button
                          //     onClick={() => setActivePopup(null)}
                          //     className="text-xs text-gray-500 mt-1 hover:underline"
                          //   >
                          //     Cancel
                          //   </button>
                          // </div>
                        )}
                        {/* </div> */}
                      </div>

                      {item.image && (
                        <div className="mb-4">
                          <button
                            onClick={() => setPreviewImage(item.image)}
                            className="group block w-full"
                          >
                            <abbr title="View Image" className="block">
                              <Image
                                width={500}
                                height={500}
                                src={item.image}
                                alt={item.image}
                                className="w-full h-60 object-cover cursor-pointer rounded-lg shadow-md group-hover:opacity-90 transition"
                              />
                            </abbr>
                          </button>
                        </div>
                      )}

                      {previewImage && (
                        <div
                          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
                          onClick={() => setPreviewImage(null)}
                        >
                          <div
                            className="bg-white rounded-lg p-2 shadow-lg max-w-[95vw] max-h-[95vh]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Image
                              src={previewImage}
                              alt="Full Preview"
                              width={800}
                              height={800}
                              className="rounded-lg object-contain w-full h-auto max-h-[85vh]"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-700 text-lg font-semibold">
                          {item.name}
                        </p>
                        <button
                          onClick={() => setActivePopupCart(item._id)}
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
                        <p
                          className={`text-sm mb-1 ${
                            item.inStock ? "text-green-600" : "text-red-700"
                          }`}
                        >
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </p>
                      </div>

                      <abbr
                        onClick={() =>
                          setShowFullId(
                            showFullId === item._id ? null : item._id
                          )
                        }
                        title={item.offerTitle}
                        className="no-underline cursor-pointer"
                      >
                        <p
                          className={`text-sm text-gray-600 mb-2 transition-all duration-200 ${
                            showFullId === item._id
                              ? "whitespace-normal"
                              : "truncate w-48 sm:w-60"
                          }`}
                        >
                          {item.offerTitle}
                        </p>
                      </abbr>

                      <Button
                        variant="contained"
                        fullWidth
                        disabled={item.inStock <= 0}
                        onClick={() => setActivePopup(item._id)}
                        title={
                          item.inStock <= 0
                            ? "Not available in stock"
                            : "Order Now"
                        }
                        sx={{
                          py: 1,
                          borderRadius: "9999px",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          textTransform: "none",
                          bgcolor:
                            item.inStock > 0 ? "primary.main" : "grey.400",
                          color: item.inStock > 0 ? "#fff" : "grey.200",
                          cursor: item.inStock > 0 ? "pointer" : "not-allowed",
                          transition: "all 0.3s ease",
                          "&:hover": item.inStock > 0 && {
                            bgcolor: "primary.dark",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                          },
                        }}
                      >
                        {item.inStock > 0 ? "Buy Now" : "Out of Stock"}
                      </Button>

                      {/* <button
                        type="button"
                        onClick={() => setActivePopup(item._id)}
                        disabled={item.inStock <= 0}
                        title={
                          item.inStock <= 0
                            ? "Not available in stock"
                            : "Order Now"
                        }
                        className={`w-full py-2 rounded-full font-bold text-sm transition-colors duration-200
                          ${
                            item.inStock > 0
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-400 text-gray-200 cursor-not-allowed"
                          }`}
                      >
                        {item.inStock > 0 ? "Buy Now" : "Out of Stock"}
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
