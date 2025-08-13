"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getHeroProducts } from "../store/features/productSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CategoryCarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getHeroProducts())
      .then((result) => {
        setProducts(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <section className="w-full w-full bg-gradient-to-br from-indigo-800 via-black to-indigo-900 text-white py-8 px-4 sm:px-25 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute w-72 h-72 bg-blue-400 opacity-20 rounded-full -top-20 -left-20 animate-ping"></div>
        <div className="absolute w-48 h-48 bg-purple-500 opacity-20 rounded-full top-1/2 left-1/2 animate-pulse"></div>
      </div>

      {!loading && (
        <Swiper
          spaceBetween={40}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="relative z-10"
        >
          {products.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-12 sm:mt-20 bg-white/5 backdrop-blur-sm shadow-2xl rounded-xl p-8 sm:p-20">
                <div className="flex-1 text-center lg:text-left space-y-5">
                  <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
                    Discover Your Fashion <br />
                    <span className="text-yellow-300 text-2xl sm:text-4xl">
                      With Style
                    </span>
                  </h1>

                  <h2 className="text-1xl sm:text-2xl font-bold text-white">
                    {item.category} Collection
                  </h2>

                  <h3 className="text-lg sm:text-xl font-semibold text-yellow-300">
                    {item.name}
                  </h3>

                  <p className="text-base sm:text-lg text-gray-200 max-w-md mx-auto lg:mx-0 leading-relaxed">
                    Discover fresh trends in {item.name.toLowerCase()} wear.{" "}
                    <br />
                    Handpicked fashion to elevate your wardrobe.
                  </p>

                  <button
                    onClick={() => router.push(`/products`)}
                    className="mt-4 inline-block bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md"
                  >
                    Shop Now
                  </button>
                </div>

                <div className="flex justify-center lg:justify-end mb-3 sm:mb-0">
                  <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-2xl shadow-xl overflow-hidden">
                    {/* <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={400}
                      priority
                      quality={100}
                      className="object-cover w-full h-full"
                    /> */}
                    <Image
                      key={item._id}
                      src={item.images[0]}
                      alt={item.name}
                      width={176}
                      height={176}
                      className="object-cover w-full h-full rounded-lg transition-all duration-300"
                      priority
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
