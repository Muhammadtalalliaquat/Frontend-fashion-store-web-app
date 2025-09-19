"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  getAllCart,
  removeCartItem,
  updateProductCart,
} from "../../store/features/productCartSlice";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/navbar";
import { createMultipleOrders } from "../../store/features/multipleorderSlice";
import {
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import FashionStoreLoader from "../../components/storeLoader";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
  CircularProgress,
  Card,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ProductCartPage() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [carts, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [posterCode, setPostercode] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errormessage, setErrorMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    dispatch(getAllCart())
      .then((result) => {
        console.log("API Response:", result.payload);
        setCart(result.payload.data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products cart items.");
        console.error("Fetch Error:", err, error);
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const selectedCartItems = selectedItems;

  const totalQuantity = selectedCartItems.reduce(
    (acc, item) => acc + (quantities[item.productId._id] || item.quantity),
    0
  );

  const totalPrice = selectedCartItems.reduce((acc, item) => {
    const quantity = quantities[item.productId._id] || item.quantity;
    const price = item.productId.discountPrice || item.productId.price;
    return acc + price * quantity;
  }, 0);

  const handleRemoveItem = (id) => {
    console.log("Removing cart item with ID:", id);

    if (!id || typeof id !== "string") {
      console.error("Invalid ID type:", id);
      return;
    }
    setCart((prev) => prev.filter((item) => item.productId._id !== id));

    dispatch(removeCartItem(id));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  const handleAddToCartEdit = (productId) => {
    if (!productId) {
      console.error("Product ID is missing!");
      return;
    }

    const newQuantity = quantities[productId] ?? 1;

    console.log(
      "Updating Product ID:",
      productId,
      "New Quantity:",
      newQuantity
    );
    dispatch(
      updateProductCart({ productId, cartData: { quantity: newQuantity } })
    )
      .then((result) => {
        console.log("API Response:", result.payload);
        dispatch(getAllCart())
          .then((result) => {
            console.log("API Response:", result.payload);
            setCart(result.payload.data.products);
            setLoading(false);
          })
          .catch((err) => {
            setError("Failed to load products cart items.");
            console.error("Fetch Error:", err, error);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Fetch Error:", err, error);
      });
  };

  const handlePlaceOrders = (e) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      setErrorMsg("Please select at least one product.");
      return;
    }

    const formattedProducts = selectedItems.map((item) => ({
      productId: item.productId._id,
      productType: item.productModel,
      quantity: item.quantity,
    }));

    const orderFormData = {
      email,
      firstName,
      lastName,
      city,
      posterCode,
      phone,
      address,
      selectedProducts: formattedProducts,
    };

    console.log("Sending Order Data:", orderFormData.selectedProducts);

    dispatch(createMultipleOrders(orderFormData))
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
            setErrorMessage(message);
            if (message.toLowerCase().includes("placed")) {
              setActivePopup(null);
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

  return (
    <>
      <Navbar />

      {loading ? (
        <FashionStoreLoader cart={true} />
      ) : (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          {carts && carts.length > 0 ? (
            <>
              <Card
                elevation={2}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  p: 3,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "grey.200",
                  mb: 4,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "600",
                    color: "text.primary",
                    letterSpacing: 0.5,
                  }}
                >
                  Your Cart
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: { xs: 2, sm: 0 },
                    color: "text.secondary",
                    textAlign: { xs: "left", sm: "right" },
                    fontWeight: 500,
                  }}
                >
                  Review items before checkout
                </Typography>
              </Card>

              {carts
                .filter((item) => item.productId)
                .map((item) => (
                  <div
                    key={item._id}
                    className="relative flex flex-row sm:flex-row items-center sm:items-start justify-between bg-white p-4 rounded-lg shadow-md mb-4"
                  >
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() =>
                          setIsMenuOpen(
                            isMenuOpen === item._id ? null : item._id
                          )
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <EllipsisVerticalIcon className="w-6 h-6" />
                      </button>

                      {isMenuOpen === item._id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-lg p-2 z-10">
                          <button
                            onClick={() =>
                              handleAddToCartEdit(
                                item.productId._id,
                                item.quantity
                              )
                            }
                            className="flex items-center gap-1 w-full text-sm font-semibold text-gray-700 px-3 py-1 rounded-lg hover:bg-blue-100 transition"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handleRemoveItem(item.productId._id);
                            }}
                            // onClick={(e) => handleRemoveItem(item.productId, e)}
                            className="flex items-center gap-1 w-full text-sm font-semibold text-red-500 px-3 py-1 rounded-lg hover:bg-red-100 transition"
                          >
                            <TrashIcon className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto flex-wrap">
                      <input
                        type="checkbox"
                        checked={selectedItems.some((i) => i._id === item._id)}
                        disabled={
                          item.productId.stock <= 0 ||
                          item.productId.inStock <= 0
                        }
                        onChange={(e) => {
                          const isChecked = e.target.checked;

                          setSelectedItems((prev) =>
                            isChecked
                              ? [...prev, item]
                              : prev.filter((i) => i._id !== item._id)
                          );

                          console.log("Selected Item:", item.productId.stock);
                        }}
                        className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500
                        ${
                          item.productId.stock <= 0 ||
                          item.productId.inStockstock <= 0
                            ? "cursor-not-allowed opacity-50"
                            : "bg-gray-100"
                        }`}
                        // className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />

                      <Image
                        src={
                          Array.isArray(item.productId?.images) &&
                          item.productId.images.length > 0
                            ? item.productId.images[0]
                            : item.productId?.image
                        }
                        alt={item.productId?.name || "Product Image"}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover shadow-md w-20 h-20 sm:w-[90px] sm:h-[90px]"
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words whitespace-normal">
                          {item.productId?.name}
                        </h3>

                        <p className="text-sm sm:text-base text-gray-600 line-clamp-1 whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.productId?.SalesCategory ||
                            item.productId?.category}
                        </p>

                        <p className="text-sm sm:text-base mt-1 font-medium text-indigo-600">
                          $
                          {(item.productId?.discountPrice ||
                            item.productId?.price) * item.quantity}
                        </p>
                        {(item.productId.stock <= 0 ||
                          item.productId.inStockstock <= 0) && (
                          <span className="text-red-500 text-xs font-semibold">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="relative flex items-center gap-3 sm:gap-4 mt-6 sm:mt-11  border-gray-300 pt-4">
                      <button
                        onClick={() => {
                          const newQuantity = Math.max(
                            1,
                            (quantities[item.productId._id] || item.quantity) -
                              1
                          );
                          handleQuantityChange(item.productId._id, newQuantity);
                        }}
                        className="w-6 h-6 sm:w-9 sm:h-9 flex items-center justify-center text-lg font-bold bg-gray-100 text-gray-700 rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition"
                      >
                        -
                      </button>

                      <span className="text-base sm:text-lg md:text-xl font-semibold">
                        {quantities[item.productId._id] || item.quantity}
                      </span>

                      <button
                        onClick={() => {
                          const newQuantity =
                            (quantities[item.productId._id] || item.quantity) +
                            1;
                          handleQuantityChange(item.productId._id, newQuantity);
                        }}
                        className="w-6 h-6 sm:w-9 sm:h-9 flex items-center justify-center text-lg font-bold bg-gray-100 text-gray-700 rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

              <button
                onClick={() => {
                  if (selectedItems.length === 0) {
                    setErrorMsg("Please select at least one product.");
                    return;
                  }

                  setActivePopup(true);
                }}
                // className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-700 transition text-lg font-medium"
                className="w-full bg-gray-800 hover:bg-blue-700 text-sm sm:text-base rounded-lg text-white font-semibold py-2 shadow-md transition duration-300"
              >
                Proceed to Checkout
              </button>

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

              {/* {activePopup && user && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-[9999]">
                  <form
                    className="bg-white w-full max-w-md p-7 rounded-lg shadow-2xl relative"
                    onSubmit={(e) => handlePlaceOrders(e, selectedItems)}
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

                    <h2 className="text-lg font-semibold mb-4">
                      Shipping Address
                    </h2>

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
                      className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
                      ) : (
                        "Place order"
                      )}
                    </button>
                  </form>
                </div>
              )} */}
              {activePopup && user && (
                <Dialog
                  open={Boolean(activePopup)}
                  onClose={() => setActivePopup(null)}
                  fullWidth
                  maxWidth="sm"
                >
                  <DialogTitle sx={{ fontWeight: "bold" }}>
                    Place Your Order
                    <IconButton
                      onClick={() => setActivePopup(null)}
                      sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>

                  <form onSubmit={(e) => handlePlaceOrders(e, selectedItems)}>
                    <DialogContent dividers>
                      <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        // required
                        error={Boolean(errorMsg.email)}
                        helperText={errorMsg.email}
                      />

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            margin="normal"
                            // required
                            error={Boolean(errorMsg.firstName)}
                            helperText={errorMsg.firstName}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            margin="normal"
                            // required
                            error={Boolean(errorMsg.lastName)}
                            helperText={errorMsg.lastName}
                          />
                        </Grid>
                      </Grid>

                      <TextField
                        fullWidth
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        margin="normal"
                        // required
                        error={Boolean(errorMsg.address)}
                        helperText={errorMsg.address}
                      />

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            margin="normal"
                            // required
                            error={Boolean(errorMsg.city)}
                            helperText={errorMsg.city}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            type="number"
                            label="Postcode"
                            value={posterCode}
                            onChange={(e) => setPostercode(e.target.value)}
                            margin="normal"
                            // required
                            error={Boolean(errorMsg.posterCode)}
                            helperText={errorMsg.posterCode}
                          />
                        </Grid>
                      </Grid>

                      <TextField
                        fullWidth
                        label="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        margin="normal"
                        // required
                        error={Boolean(errorMsg.phone)}
                        helperText={errorMsg.phone}
                      />
                    </DialogContent>

                    <DialogActions>
                      <Button
                        onClick={() => setActivePopup(null)}
                        color="secondary"
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                        startIcon={
                          isSubmitting && (
                            <CircularProgress size={18} color="inherit" />
                          )
                        }
                      >
                        {isSubmitting ? "Placing..." : "Place Order"}
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
              )}
              <Snackbar
                open={Boolean(errormessage)}
                autoHideDuration={4000}
                onClose={() => setErrorMsg(null)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={() => setErrorMsg(null)}
                  severity={
                    errormessage?.toLowerCase().includes("success") ||
                    errormessage?.toLowerCase().includes("placed")
                      ? "success"
                      : "error"
                  }
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  {errormessage}
                </Alert>
              </Snackbar>

              {selectedCartItems.length > 0 && (
                <div className="mt-6 p-4 rounded-xl border border-gray-200 bg-gray-50 text-right">
                  <p className="text-sm font-medium">
                    Total Quantity: {totalQuantity}
                  </p>
                  <p className="text-sm font-semibold text-indigo-700">
                    Total Price: ${totalPrice.toFixed(2)}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center mt-46">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 text-gray-400 mb-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2 10h14l2-6H5" />
              </svg>

              <h1 className="text-center text-2xl sm:text-3xl font-semibold text-gray-700">
                Your Cart is Empty.
              </h1>
              <p className="text-gray-500 mt-2 text-lg">
                Start adding products to your cart now!
              </p>

              <button
                onClick={() => navigate("/shop")}
                className="mt-6 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
              >
                Shop Now
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
