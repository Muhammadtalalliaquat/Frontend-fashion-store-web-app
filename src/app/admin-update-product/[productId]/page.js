"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createProduct,
  updateProduct,
  getAllProducts,
} from "../../../store/features/productSlice";
import { useRouter } from "next/navigation";
import withAdminCheck from "../../../HOC/withAuth";
import { useParams } from "next/navigation";
import Navbar from "../../../compoments/navbar";

function ProductPage() {
  const params = useParams();
  const productId = params?.productId;

  const dispatch = useDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);

  useEffect(() => {
    console.log(productId);
    if (productId) {
      dispatch(getAllProducts(productId))
        .then((response) => {
          const data = response.payload;
          console.log("Product data:", data);

          if (data) {
            setName(data.name || "");
            setPrice(data.price || "");
            setCategory(data.category || "");
            setDescription(data.description || "");
            setStock(data.stock || 0);
            setImage(data.image || null);
          }
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [productId, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId) {
      console.error("Product ID is missing!");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("image", image);

    console.log("Product Data:", formData);
    setIsSubmitting(true);

    try {
      if (productId) {
        await dispatch(updateProduct({ id: productId, productData: formData }));
      } else {
        await dispatch(createProduct(formData));
      }
      router.push("/fashion-store");
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-xl mt-25 backdrop-blur-md bg-opacity-80 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields with Floating Labels */}
          {[
            {
              label: "Product Name",
              value: name,
              setter: setName,
              type: "text",
            },
            { label: "Price", value: price, setter: setPrice, type: "number" },
            {
              label: "Category",
              value: category,
              setter: setCategory,
              type: "text",
            },
            { label: "Stock", value: stock, setter: setStock, type: "number" },
          ].map((field, index) => (
            <div key={index} className="relative">
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition peer"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition peer"
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
              className="w-full text-gray-600"
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
      </div>
    </>
  );
}

export default withAdminCheck(ProductPage);
