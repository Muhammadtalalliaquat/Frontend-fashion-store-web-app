"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../store/features/productSlice";
import { createDiscountOffer } from "../../store/features/discountSlice";
import { useRouter } from "next/navigation";
import withAdminCheck from "../../HOC/withAuth";
import Navbar from "../../compoments/navbar";

function AddProductPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [activeTab, setActiveTab] = useState("product");

  const [productName, setProductName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [SalesCategory, setSalesCategory] = useState("");
  const [inStock, setinStock] = useState("");
  const [expiresAt, setExpiresAt] = useState(0);
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDescription, setofferDescription] = useState("");

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("stock", stock.toString());
    if (image) {
      formData.append("image", image);
    }

    console.log("Product Data:", formData);
    setIsSubmitting(true);

    try {
      dispatch(createProduct(formData));
      console.log("product successfully added!", formData);
      router.push("/fashion-store");
    } catch (error) {
      console.error("Error adding discount:", error);
    }
  };

  const handleSubmitDiscount = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("productName", productName);
    data.append("originalPrice", originalPrice);
    data.append("discountPrice", discountPrice);
    data.append("SalesCategory", SalesCategory);
    data.append("inStock", inStock);
    data.append("offerTitle", offerTitle);
    data.append("description", description);
    data.append("offerDescription", offerDescription);
    data.append("expiresAt", expiresAt);

    if (image) {
      data.append("image", image);
    }

    try {
      dispatch(createDiscountOffer(data));
      console.log("Discount successfully added!", data);
      router.push("/fashion-store");
    } catch (error) {
      console.error("Error adding discount:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex bg-gray-100 border-b relative z-0">
            <button
              onClick={() => setActiveTab("product")}
              className={`flex-1 py-4 font-semibold transition duration-300 text-center ease-in-out transform relative ${
                activeTab === "product"
                  ? "border-b-4 border-blue-500 text-blue-600 bg-white scale-105 shadow-lg z-10"
                  : "text-gray-500 hover:text-blue-500 hover:scale-105 hover:bg-blue-50 z-0"
              }`}
            >
              🛍 Add Product
            </button>
            <button
              onClick={() => setActiveTab("discount")}
              className={`flex-1 py-4 font-semibold transition duration-300 text-center ease-in-out transform relative ${
                activeTab === "discount"
                  ? "border-b-4 border-green-500 text-green-600 bg-white scale-105 shadow-lg z-10"
                  : "text-gray-500 hover:text-green-500 hover:scale-105 hover:bg-green-50 z-0"
              }`}
            >
              💸 Add Discount
            </button>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {activeTab === "product" ? (
              <form onSubmit={handleSubmitProduct} className="space-y-6">
                {[
                  {
                    label: "Product Name",
                    value: name,
                    setter: setName,
                    type: "text",
                  },
                  {
                    label: "Price",
                    value: price,
                    setter: setPrice,
                    type: "number",
                  },
                  {
                    label: "Category",
                    value: category,
                    setter: setCategory,
                    type: "text",
                  },
                  {
                    label: "Stock",
                    value: stock,
                    setter: setStock,
                    type: "number",
                  },
                ].map((field, index) => (
                  <div key={index} className="relative">
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      className="w-full p-3 border border-gray-300 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition peer"
                      required
                    />
                    <label
                      className={`absolute left-3 top-3 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-blue-500 peer-focus:text-sm bg-white px-1`}
                    >
                      {field.label}
                    </label>
                  </div>
                ))}

                <div className="relative">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition peer"
                    required
                  />
                  <label
                    className={`absolute left-3 top-3 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-blue-500 peer-focus:text-sm bg-white px-1`}
                  >
                    Description
                  </label>
                </div>

                <div className="bg-gray-100 border border-dashed border-gray-400 rounded-lg p-3 flex justify-center items-center cursor-pointer hover:border-blue-500 transition">
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full text-gray-600 shadow"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 rounded-lg hover:shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
                  ) : (
                    "Add Product"
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmitDiscount} className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Add Discount Offer
                </h2>

                {[
                  {
                    label: "Product Name",
                    value: productName,
                    setter: setProductName,
                    type: "text",
                  },
                  {
                    label: "Price",
                    value: originalPrice,
                    setter: setOriginalPrice,
                    type: "number",
                  },
                  {
                    label: "Discount Price",
                    value: discountPrice,
                    setter: setDiscountPrice,
                    type: "number",
                  },
                  {
                    label: "Sales Category",
                    value: SalesCategory,
                    setter: setSalesCategory,
                    type: "text",
                  },
                  {
                    label: "In Stock",
                    value: inStock,
                    setter: setinStock,
                    type: "number",
                  },
                  {
                    label: "Offer Title",
                    value: offerTitle,
                    setter: setOfferTitle,
                    type: "text",
                  },
                  {
                    label: "Offer Description",
                    value: offerDescription,
                    setter: setofferDescription,
                    type: "text",
                  },
                  {
                    label: "Expires on:",
                    value: expiresAt,
                    setter: setExpiresAt,
                    type: "date",
                  },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={field.name}
                      onChange={(e) => field.setter(e.target.value)}
                      // onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full bg-gray-100 border border-dashed border-gray-400 rounded-lg p-3 flex justify-center items-center cursor-pointer hover:border-green-400 transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  {isSubmitting ? (
                    <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
                  ) : (
                    "Add Discount Product"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminCheck(AddProductPage);
