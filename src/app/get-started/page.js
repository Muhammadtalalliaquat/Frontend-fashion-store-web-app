import Image from "next/image";

export default function GetStarted() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-10">
        {/* Left Side: Text Content */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900">
            Elevate Your Style with <span className="text-blue-600">Trendy Fashion</span>
          </h1>
          <p className="text-lg text-gray-600">
            Discover the latest fashion trends and shop for high-quality products. Upgrade your wardrobe today!
          </p>
          <div className="flex gap-4">
            <a href="/home" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition">
              Shop Now
            </a>
            <a href="/login" className="px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-gray-300 transition">
              Join Us
            </a>
          </div>
        </div>

        {/* Right Side: Glassmorphic Image Card */}
        <div className="relative">
          <div className="relative w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30"></div>
            <Image
              src="/product_image.jpg"
              alt="Fashion Model"
              width={500}
              height={500}
              className="relative w-full h-auto rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
