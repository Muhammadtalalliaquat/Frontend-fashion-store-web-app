"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function GetStarted() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url("/product-photos.jpg")' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl max-w-7xl w-full mx-4 md:mx-10 p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-200 leading-tight">
            Discover Your <span className="text-blue-600">Signature Style</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Explore premium fashion collections curated for modern trends.
            Elevate your wardrobe today.
          </p>
          <div className="flex gap-4">
            <Link
              href="/shop"
              className="px-6 py-3 text-lg bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
            >
              Shop Now
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 text-lg bg-white border border-gray-300 text-gray-800 font-semibold rounded-xl shadow-md hover:bg-gray-100 transition duration-300"
            >
              Join Us
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="flex justify-center items-center"
        >
          <Image
            src="/fashion-store-logo.jpg"
            alt="Fashion Model"
            width={500}
            height={500}
            className="rounded-lg"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
