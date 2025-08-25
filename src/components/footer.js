// "use client";

import Link from "next/link";
import { createSubscribe } from "../store/features/subscribeSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const action = isSubscribed ? true : false;
  const addHandelSubscribe = (e) => {
    e.preventDefault();

    dispatch(createSubscribe({ email, unsubscribe: action }))
      .then((result) => {
        const message = result.payload?.msg;

        if (message) {
          setMessage(message);
        }
        if (message?.includes("unsubscribed")) {
          setIsSubscribed(false);
          setMessage("You have been unsubscribed.");
        } else if (message?.includes("subscribed")) {
          setIsSubscribed(true);
          setMessage("You have been subscribed.");
        } if (message?.toLowerCase().includes("already")) {
          setMessage("You are already subscribed.");
        }

        if (result.payload?.success) {
          setEmail("");
        }
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setMessage("Something went wrong. Try again.");
      });
  };


  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  const footerData = {
    brand: {
      name: "Fashion Store",
      description:
        "Trendy styles, timeless looks. Shop the best in fashion today.",
      year: new Date().getFullYear(),
    },
    quickLinks: [
      { name: "Home", href: "/get-started" },
      { name: "Products", href: "/products" },
      { name: "Shop now", href: "/shop" },
      { name: "Contact", href: "/contact" },
    ],
    supportLinks: [
      // { name: "FAQs", href: "/faqs" },
      { name: "Returns", href: "/returnsPolicy" },
      { name: "Shipping Info", href: "/shippingInfo" },
      { name: "Track Order", href: "/ordersPage" },
    ],
  };

  return (
    <>
      <footer className="bg-gray-900 text-white px-6 py-6 pt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-2">{footerData.brand.name}</h2>
            <p className="text-sm text-gray-400">
              {footerData.brand.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <a className="hover:text-pink-600" href={link.href}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Customer Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {footerData.supportLinks.map((link, index) => (
                <li key={index}>
                  <Link className="hover:text-pink-600" href={link.href}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Subscribe</h3>
            <p className="text-sm text-gray-400 mb-2">
              Get the latest offers & updates.
            </p>
            <form onSubmit={addHandelSubscribe} className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded bg-gray-800 text-white mb-3"
              />
              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded"
              >
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </button>

              {/* Popup message */}
              {message && (
                <div
                  className={`fixed top-[110px] left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-4 py-2 rounded shadow-lg transition-all duration-500 ${
                    message
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {footerData.brand.year} {footerData.brand.name}. All rights
          reserved.
        </div>
      </footer>
    </>
  );
}
