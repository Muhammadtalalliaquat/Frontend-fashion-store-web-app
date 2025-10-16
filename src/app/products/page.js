"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  fetchAllProductShow,
  // getProductsFetchSizeShow,
} from "../../store/features/productSlice";
// import { Listbox } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
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
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ScrollTo from "../../components/scrolltotop";
import {
  Card,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Typography,
} from "@mui/material";

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
  const [wishlistIds, setWishlistIds] = useState([]);
  const [error, setError] = useState("");
  // const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // const [loadingMsg, setLoadingMsg] = useState(true);
  // const [errorMsg, setErrorMsg] = useState("");
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    setMounted(true);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // useEffect(() => {
  //   const filtered = products.filter(
  //     (product) =>
  //       (category === "all" || product.category === category) &&
  //       product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   setSortedProducts(filtered);
  // }, [products, category, searchTerm]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const filtered = useMemo(() => {
    let result = products.filter(
      (product) =>
        (category === "all" || product.category === category) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, searchTerm, sortOrder]);

  if (!mounted) {
    return null;
  }

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
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      })
      .finally(() => router.push("/productCart"));
  };

  const handleAddToWishlist = (productId) => {
    const selectedProduct = products.find((p) => p._id === productId);
    if (!selectedProduct) return console.error("Product not found.");

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
        const msg = result.payload?.msg;
        if (msg) {
          setError(msg);
        } else {
          setWishlistIds((prev) =>
            prev.includes(productId) ? prev : [...prev, productId]
          );
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  };

  const handleWishlistToggle = (productId) => {
    if (!user) {
      setWishListPopup(productId);
      return;
    }

    if (wishlistIds.includes(productId)) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
    } else {
      handleAddToWishlist(productId);
      setWishlistIds((prev) => [...prev, productId]);
    }
  };

  const toggleSortByPrice = () => {
    // const sorted = [...sortedProducts].sort((a, b) => {
    //   return sortOrder === "desc" ? a.price - b.price : b.price - a.price;
    // });
    // setSortedProducts(sorted);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const categories = [
    { name: "All Categories", value: "all" },
    { name: "Jewellery", value: "Jewellery" },
    { name: "Men's & Women's Watches", value: "Watch" },
  ];

  // const loadProducts = (pageNum) => {
  //   setLoadingMsg(true);
  //   setErrorMsg("");

  //   dispatch(fetchAllProductShow({ page: pageNum }))
  //     .then((result) => {
  //       const newProducts = result.payload?.data || [];

  //       if (newProducts.length === 0) {
  //         setHasMore(false);
  //       } else {
  //         setProducts((prev) => {
  //           const merged = [...prev, ...newProducts];
  //           return merged.filter(
  //             (p, i, self) => i === self.findIndex((obj) => obj._id === p._id)
  //           );
  //         });
  //       }

  //       setLoadingMsg(false);
  //     })
  //     .catch(() => {
  //       setErrorMsg("Failed to load products. Please try again.");
  //       setLoadingMsg(false);
  //     });
  // };

  // const handleLoadMore = () => {
  //   const nextPage = page + 1;
  //   setPage(nextPage);
  //   loadProducts(nextPage);
  // };

  // useEffect(() => {
  //   loadProducts(1); // first load
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <Navbar />
      <ScrollTo />

      {/* {loading && <FashionStoreLoader product={products} />} */}

      <section className="px-6 py-10 bg-gray-100 min-h-screen pb-40">
        <div className="max-w-7xl mx-auto">
          <Card
            elevation={2}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6"
          >
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              All Products
            </h1>

            <span className="text-sm text-gray-500 mt-3 sm:mt-0 sm:text-right">
              <span className="font-medium text-gray-700">
                Manage and explore all listed products
              </span>
            </span>
          </Card>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              mb: 4,
              flexWrap: "wrap",
            }}
          >
            {/* Sort by Price Button */}
            <Button
              onClick={toggleSortByPrice}
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderRadius: 4,
                fontWeight: 600,
                px: 3,
                py: 1.5,
                textTransform: "none",
                transition: "all 0.3s ease",
                color: "text.primary",
                borderColor: "transparent",
                "&:hover": {
                  // bgcolor: "grey.800",
                  borderColor: "black",
                  color: "grey.900",
                  // color: "#ffffffff",
                },
              }}
            >
              Sort by Price
              <motion.div
                animate={{ rotate: sortOrder === "asc" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <TiArrowSortedUp size={20} />
              </motion.div>
            </Button>

            {/* Search Field */}
            <TextField
              variant="outlined"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              sx={{
                width: { xs: "100%", sm: "50%" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />

            {/* Category Dropdown */}
            <FormControl
              fullWidth
              sx={{
                width: { xs: "100%", sm: "30%" },
              }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  bgcolor: "#fff",
                }}
              >
                {categories.map((item, idx) => (
                  <MenuItem key={idx} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
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
          </div> */}

          {loading ? (
            <FashionStoreLoader product={products} />
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product, index) => (
                <div
                  key={product._id + index}
                  className="group relative bg-white rounded-xl shadow-md p-4 hover:bg-gray-50 transition-all duration-300 flex flex-col items-center text-center"
                >
                  {wishlistIds.includes(product._id)}
                  <div className="relative group w-full max-w-sm pb-3 rounded-xl overflow-hidden shadow-lg border border-gray-200 p-2 sm:pb-4 pb-24 bg-cover bg-center bg-no-repeat">
                    <button
                      onClick={() => setActivePopupCart(product._id)}
                      className="absolute top-3 right-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 z-20 bg-blue-100 hover:bg-blue-200 p-2 rounded-full shadow-md cursor-pointer"
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
                      // <div className="absolute top-14 right-3 bg-white shadow-lg rounded-lg p-4 z-40 w-40 flex flex-col items-center">
                      //   <label className="text-sm mb-1">Quantity</label>
                      //   <input
                      //     type="number"
                      //     min="1"
                      //     max={product.stock}
                      //     value={quantities[product._id] || 1}
                      //     onChange={(e) =>
                      //       handleQuantityChange(product._id, e.target.value)
                      //     }
                      //     className="mb-2 w-16 text-center border border-gray-300 rounded px-2 py-1"
                      //   />
                      //   <button
                      //     className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm w-full"
                      //     onClick={() => handleAddToCart(product._id)}
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
                      <Paper
                        elevation={6}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 180,
                          zIndex: 40,
                          p: 2,
                          borderRadius: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          bgcolor: "background.paper",
                          boxShadow: 6,
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
                            max: product.stock,
                            style: { textAlign: "center" },
                          }}
                          value={quantities[product._id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(product._id, e.target.value)
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
                          onClick={() => handleAddToCart(product._id)}
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
                    )}

                    <div className="absolute top-2 left-4 z-20">
                      <button
                        onClick={() => handleWishlistToggle(product._id)}
                        className={`bg-white ${
                          wishlistIds.includes(product._id)
                            ? "text-red-600 hover:bg-red-600 hover:text-white"
                            : "text-red-500 hover:bg-red-400 hover:text-white"
                        } transition-all duration-300 ease-in-out rounded-full p-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100`}
                      >
                        {wishlistIds.includes(product._id) ? (
                          <AiFillHeart className="w-5 h-5" />
                        ) : (
                          <AiOutlineHeart className="w-5 h-5" />
                        )}
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
                      <div
                        className={`fixed top-16 left-1/2 transform -translate-x-1/2 
                        w-[90%] max-w-md sm:max-w-lg md:max-w-xl2 
                          px-4 sm:px-6 py-3 sm:py-4 
                          shadow-md text-white text-sm sm:text-base font-medium 
                           transition-all duration-500 z-50 
                           ${
                             error.toLowerCase().includes("success") ||
                             error.toLowerCase().includes("placed")
                               ? "bg-green-600"
                               : "bg-gray-600"
                           }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex-1 break-words">{error}</span>
                          <button
                            onClick={() => setError(null)}
                            className="ml-2 text-white hover:text-gray-200 focus:outline-none text-lg"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="w-full h-44 sm:mb-2">
                      {product.images?.length > 0 && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="object-contain sm:object-cover w-full h-full rounded-lg transition-all duration-300"
                          priority
                        />
                      )}
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
                      <Button
                        variant="contained"
                        onClick={() => {
                          const queryString = new URLSearchParams({
                            productId: product._id,
                            name: product.name,
                            price: product.price.toString(),
                            category: product.category,
                            stock: product.stock.toString(),
                            description: product.description,
                            image: JSON.stringify(product.images || []),
                            // image: product.images,
                          }).toString();
                          router.push(`/productDetails?${queryString}`);
                        }}
                        sx={{
                          width: 150,
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          bgcolor: "primary.main",
                          color: "#fff",
                          backdropFilter: "blur(6px)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: "primary.dark",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                          },
                        }}
                      >
                        View Details
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => setActivePopup(product._id)}
                        disabled={product.stock <= 0}
                        title={
                          product.stock <= 0
                            ? "Not available in stock"
                            : "Buy Now"
                        }
                        sx={{
                          width: 150,
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          bgcolor:
                            product.stock > 0 ? "success.main" : "grey.400",
                          color: product.stock > 0 ? "#fff" : "grey.200",
                          cursor: product.stock > 0 ? "pointer" : "not-allowed",
                          backdropFilter: "blur(6px)",
                          transition: "all 0.3s ease",
                          "&:hover": product.stock > 0 && {
                            bgcolor: "success.dark",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                          },
                        }}
                      >
                        {product.stock > 0 ? "Buy Now" : "Out of Stock"}
                      </Button>

                      {/* <button
                        className="bg-blue-600/80 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm backdrop-blur-md w-36"
                        onClick={() => {
                          const queryString = new URLSearchParams({
                            productId: product._id,
                            name: product.name,
                            price: product.price.toString(),
                            category: product.category,
                            stock: product.stock.toString(),
                            description: product.description,
                            image: JSON.stringify(product.images || []),
                            // image: product.images,
                          }).toString();
                          router.push(`/productDetails?${queryString}`);
                        }}
                      >
                        View Details
                      </button>

                      <button
                        type="button"
                        onClick={() => setActivePopup(product._id)}
                        disabled={product.stock <= 0}
                        title={
                          product.stock <= 0
                            ? "Not available in stock"
                            : "Buy Now"
                        }
                        className={`px-4 py-2 rounded-md text-sm backdrop-blur-md w-36 
                        ${
                          product.stock > 0
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-400 text-gray-200 cursor-not-allowed"
                        }`}
                      >
                        {product.stock > 0 ? "Buy Now" : "Out of Stock"}
                      </button> */}

                      {activePopup === product._id && user && (
                        <Paper
                          elevation={6}
                          sx={{
                            position: "absolute",
                            bottom: 56,
                            width: 180,
                            zIndex: 30,
                            p: 2,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            bgcolor: "background.paper",
                            boxShadow: 6,
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
                              max: product.stock,
                              style: { textAlign: "center" },
                            }}
                            value={quantities[product._id] || 1}
                            onChange={(e) =>
                              handleQuantityChange(product._id, e.target.value)
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
                              const quantity = quantities[product._id] || 1;
                              const queryString = new URLSearchParams({
                                productId: product._id,
                                name: product.name,
                                price: product.price.toString(),
                                category: product.category,
                                stock: product.stock.toString(),
                                description: product.description,
                                image: JSON.stringify(product.images || []),
                                quantity: quantity.toString(),
                              }).toString();
                              router.push(`/placeOrder?${queryString}`);
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

                        // <div className="absolute bottom-14 bg-white shadow-lg rounded-lg p-4 z-30 w-40 flex flex-col items-center">
                        //   <label className="text-sm mb-1">Quantity</label>
                        //   <input
                        //     type="number"
                        //     min="1"
                        //     max={product.stock}
                        //     value={quantities[product._id] || 1}
                        //     onChange={(e) =>
                        //       handleQuantityChange(product._id, e.target.value)
                        //     }
                        //     className="mb-2 w-16 text-center border border-gray-300 rounded px-2 py-1"
                        //   />
                        //   <button
                        //     className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm w-full"
                        //     onClick={() => {
                        //       const quantity = quantities[product._id] || 1;
                        //       const queryString = new URLSearchParams({
                        //         productId: product._id,
                        //         name: product.name,
                        //         price: product.price.toString(),
                        //         category: product.category,
                        //         stock: product.stock.toString(),
                        //         description: product.description,
                        //         image: JSON.stringify(product.images || []),
                        //         quantity: quantity.toString(),
                        //       }).toString();
                        //       router.push(`/placeOrder?${queryString}`);
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>

        {/* {!hasMore && !loadingMsg && (
          <p className="text-center text-gray-500 mt-4">
            No more products to load.
          </p>
        )}

        {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}

        {hasMore && loadingMsg && (
          <div className="text-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Load More
            </button>
          </div>
        )} */}
      </section>

      <Footer />
    </>
  );
}
