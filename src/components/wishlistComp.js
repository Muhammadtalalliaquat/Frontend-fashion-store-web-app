"use client";

import { getAllWishList, removeWishListItem } from "../store/features/wishListSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
// import { useRouter } from "next/navigation";

export default function WishlistComponent() {
  const [wishListData, setWishListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  //   const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    dispatch(getAllWishList())
      .then((result) => {
        console.log("API Response DATAT HERE:", result.payload);
        setWishListData(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err, error);
        setLoading(false);
      });
  }, [dispatch]);

  const handleDeleteWishlist = (productId) => {
    console.log(productId, "id here:");
    dispatch(removeWishListItem(productId))
      .then((result) => {
        console.log("API Response:", result.payload);
        dispatch(getAllWishList())
          .then((result) => {
            console.log("API Response DATAT HERE:", result.payload);
            setWishListData(result.payload.data);
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

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-3xl md:text-4xl mb-2">♡</div>
          <h1 className="text-2xl md:text-3xl font-bold">My Wishlist</h1>
          <p className="text-gray-500 text-sm mt-2">Home / Wishlist</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading wishlist...</div>
        ) : wishListData?.products.length === 0 ? (
          <div className="text-center text-gray-600">
            Your wishlist is empty.
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full border-t text-center">
                <thead>
                  <tr className="text-left text-sm text-gray-700 border-b">
                    <th className="p-4"></th>
                    <th className="p-4">Product name</th>
                    <th className="p-4 text-center">Unit price</th>
                    <th className="p-4 text-center">Stock status</th>
                    <th className="p-4 text-center">Added on</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {wishListData.products.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-4">
                        <button
                          onClick={() =>
                            !user
                              ? null
                              : handleDeleteWishlist(item.productId._id)
                          }
                          className="text-gray-400 hover:text-red-500 text-xl"
                        >
                          🗑
                        </button>
                      </td>
                      <td className="p-4 flex items-center gap-4">
                        <Image
                          src={item.productId.image || "/placeholder.png"}
                          alt={item.productId.name || "product image"}
                          width={48}
                          height={48}
                          className="object-cover border rounded"
                        />
                        <span>{item?.productId?.name}</span>
                      </td>
                      <td className="p-4">
                        {item?.productId?.originalPrice && (
                          <span className="line-through text-gray-400 mr-2">
                            ${item.productId.originalPrice}
                          </span>
                        )}
                        <span className="text-yellow-600 font-medium">
                          ${item.productId.price}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-semibold">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-xs ${
                            item.productId.stock > 0
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {item.productId.stock > 0
                            ? `In Stock (${item.productId.stock})`
                            : "Out of Stock"}
                        </span>
                      </td>
                      <td className="text-sm text-gray-500">
                        {item?.productId.createdAt
                          ? formatDistanceToNow(
                              new Date(item?.productId.createdAt),
                              {
                                addSuffix: true,
                              }
                            )
                          : "Date not available"}
                      </td>
                      <td className="p-4">
                        <button
                          //   onClick={() => handleDeleteWishlist(item.productId._id)}
                          className="bg-teal-600 hover:bg-teal-700 text-white text-sm px-4 py-2 rounded"
                        >
                          Add to cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {wishListData.products.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg p-4 shadow-sm relative"
                >
                  <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl">
                    🗑
                  </button>

                  <div className="flex items-center gap-4">
                    <Image
                      src={item.productId.image || "/placeholder.png"}
                      alt={item.productId.name || "product image"}
                      width={60}
                      height={60}
                      className="object-cover border rounded"
                    />
                    <div>
                      <h2 className="text-base font-semibold">
                        {item.productId.name}
                      </h2>
                      <p className="text-sm text-yellow-600 font-medium">
                        ${item.productId.price}
                      </p>
                      {item.productId.originalPrice && (
                        <p className="text-xs line-through text-gray-400">
                          ${item.productId.originalPrice}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-600 text-right">
                    <p>
                      {item.productId.stock > 0 ? (
                        <span className="text-green-600 font-semibold">
                          In Stock ({item.productId.stock})
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Out of Stock
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {item?.productId.createdAt
                        ? formatDistanceToNow(
                            new Date(item?.productId.createdAt),
                            {
                              addSuffix: true,
                            }
                          )
                        : "Date not available"}
                    </p>
                  </div>

                  <button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white text-sm py-2 rounded">
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
