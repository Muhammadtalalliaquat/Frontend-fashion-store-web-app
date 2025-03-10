"use client";

import Navbar from "../../compoments/navbar";
import withAdminCheck from "../../HOC/withAuth";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../store/features/productSlice";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";

function AdminDashboard() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // const handleDelete = (id) => {
  //   //     dispatch(removeProduct(id));
  //   //     setProducts((prev) => prev.filter((product) => product._id !== id));
  //   //   };

  return (
    <div>
      <Navbar />

      <div className="p-6 mt-16">
        <h2 className="text-3xl font-bold mb-6">Products</h2>

        {loading ? (
          <div className="flex justify-center items-center fixed inset-0 bg-white">
            <FaSpinner className="animate-spin text-5xl text-blue-500" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
              >
                <div className="relative w-40 h-40 mb-4">
                  <Image
                    src={product.image}
                    alt="Product"
                    width={160}
                    height={160}
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                    priority
                  />
                </div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>

                {/* <button
//                 className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
//                 onClick={() => handleDelete(product._id)}
//               >
//                 Delete
//               </button> */}
              </div>
            ))}
          </div>
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

export default withAdminCheck(AdminDashboard);
