"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../compoments/navbar";
import {
  StarIcon,
  ShoppingCartIcon,
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import { removeProduct } from "../../store/features/productSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";


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
  const dispatch = useDispatch();
  
  // const [loading, setLoading] = useState(true);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

      // setLoading(false);

    console.log(
      "Product data here",
      productId,
      name,
      price,
      category,
      description,
      image
    );
  }, []);

  const handleDelete = async () => {
    if (!productId) {
        console.error("Product ID is missing!");
        return;
    }
    
    console.log(productId, "id here");
  
    try {
        const result = await dispatch(removeProduct(productId));
        console.log("Product deleted successfully:", result);
        router.push("/adminDashboard")
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};


  return (
    <>
      {/* { loading ? ( */}
        {/* // <div className="flex justify-center items-center h-screen">
        //   <ClipLoader size={60} color="#4A90E2" />
        // </div> */}
      {/* ) : ( */}
        <>
          <Navbar />

          <div className="max-w-4xl mx-auto p-6 mt-20 bg-white rounded-lg shadow-lg">
            {/* Product Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-bold text-gray-900">{name}</h2>

              <div className="relative">
                {user?.isAdmin === true && (
                  <button
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                    onClick={() => 
                      setIsMenuOpen(!isMenuOpen)}
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
                  <button className="flex items-center gap-1 w-full text-sm font-semibold text-grey-400 px-3 py-1 rounded-lg hover:bg-blue-200 transition">
                    <PencilSquareIcon className="w-4 h-4 text-gray-500" />
                    Edit
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="flex items-center gap-1 w-full text-sm font-semibold text-red-300 px-3 py-1 rounded-lg hover:bg-red-100 transition">
                    <TrashIcon className="w-4 h-4 text-gray-350" />
                    Delete
                  </button>
                </div>

                {/* {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-lg p-2">
        <button className="flex items-center gap-1 w-full text-black px-3 py-1 rounded-lg hover:bg-blue-200 transition">
          <PencilSquareIcon className="w-5 h-5" />
          Edit
        </button>
        <button className="flex items-center gap-1 w-full text-black px-3 py-1 rounded-lg hover:bg-red-100 transition">
          <TrashIcon className="w-5 h-5" />
          Delete
        </button>
      </div>
      )} */}
              </div>

              {/* {user?.isAdmin === true && (
    <div className="flex gap-3">
      <button className="flex items-center gap-1  text-black px-3 py-1 rounded-lg shadow-md hover:bg-blue-200 transition">
        <PencilSquareIcon className="w-5 h-5" />
        Edit
      </button>
      <button className="flex items-center gap-1 text-black px-3 py-1 rounded-lg shadow-md hover:bg-red-100 transition">
        <TrashIcon className="w-5 h-5" />
        Delete
      </button>
    </div>
  )} */}
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
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    (120 Reviews)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-gray-700 font-medium">Quantity:</label>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-lg bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-lg bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition">
                  <ShoppingCartIcon className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800">
                Product Details
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </>
      {/* )} */}
    </>
  );
}
