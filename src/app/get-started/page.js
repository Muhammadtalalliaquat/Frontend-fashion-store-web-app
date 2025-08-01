"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
// import FashionStoreLoader from "@/compoments/storeLOader";

export default function GetStarted() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: 'url("/product-photos.jpg")' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-6xl p-6 sm:p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center text-center md:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-100 leading-tight">
            Discover Your <span className="text-blue-500">Signature Style</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200">
            Explore premium collections curated for modern fashion. Elevate your
            wardrobe today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/shop"
              className="w-full sm:w-auto sm:px-5 sm:py-3 px-3 py-2 text-base bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition duration-300 text-center"
            >
              Shop Now
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto sm:px-5 sm:py-3 px-3 py-2 text-base border border-white text-white font-semibold rounded-xl shadow hover:bg-white hover:text-black transition duration-300 text-center"
            >
              Join Us
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="hidden md:flex justify-center items-center"
        >
          <Image
            src="/fashion-store-logo.jpg"
            alt="Fashion Model"
            width={400}
            height={400}
            className="rounded-xl w-full max-w-xs sm:max-w-md object-cover"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
