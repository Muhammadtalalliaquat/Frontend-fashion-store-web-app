"use client";

import { useState, useEffect } from "react";

export default function OfferCard({ item }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [showCard, setShowCard] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(item).getTime();
      const distance = expiry - now;

      if (distance <= 0) {
        setShowCard(false); // Hide the product
        clearInterval(interval);
      } else {
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [item]);


  if (!showCard) return null;

  return (
    <div>
      <p className="text-sm text-gray-600">
        Limited time offer ends in:{" "}
        <span className="font-semibold">{timeLeft}</span>
      </p>
      <p className="text-xs text-gray-400">
        Posted on: {new Date(item).toLocaleString()}
      </p>
    </div>
  );
}

