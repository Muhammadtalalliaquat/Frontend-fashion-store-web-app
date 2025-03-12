"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../compoments/navbar";

export default function ProductDetails() {
//   const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("_id");
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const category = searchParams.get("category");
  const stock = searchParams.get("stock");
  const description = searchParams.get("description");
  const image = searchParams.get("image");

  //   const { productId, name, price, category, stock, description, image } =
  //     router.query;

  useEffect(() => {
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

  return (
    <>
      <Navbar />

      <div className="p-6 mt-16">
        <h2 className="text-3xl font-bold">{name}</h2>

        <Image
          src={image}
          alt="Product"
          width={160}
          height={160}
          style={{ objectFit: "cover" }}
          className="rounded-md w-64 h-64 object-cover"
          priority
        />
        <p className="text-gray-600">${price}</p>
        <p className="text-gray-600">Category: {category}</p>
        <p className="text-gray-600">Stock: {stock}</p>
        <p className="text-gray-600">{description}</p>
      </div>
    </>
  );
}
