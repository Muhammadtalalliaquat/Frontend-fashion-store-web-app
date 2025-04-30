// "use client";

import Link from "next/link";
import { createSubscribe } from "../store/features/subscribeSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

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
      <footer className="bg-gray-900 text-white px-6 py-12">
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
                <li key={index} className="hover:text-pink-600">
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Customer Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {footerData.supportLinks.map((link, index) => (
                <li key={index} className="hover:text-pink-600">
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Subscribe</h3>
            <p className="text-sm text-gray-400 mb-2">
              Get the latest offers & updates.
            </p>
            <form onSubmit={addHandelSubscribe}>
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
              {message && (
                <p className="text-sm mt-2 text-center text-pink-500">
                  {message}
                </p>
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
