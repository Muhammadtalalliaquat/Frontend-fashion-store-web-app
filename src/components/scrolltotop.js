// "use client";
import { useState, useEffect } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function ScrollTo() {

  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleScrollYeaix = () => {
      if (window.scrollY > 350) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScrollYeaix);

    return () => window.removeEventListener("scroll", handleScrollYeaix);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {showButton && (
        <div
          className="fixed bottom-6 right-6 z-40 flex flex-row-reverse items-center bg-blue-600 text-white rounded-full px-4 py-2 shadow-lg cursor-pointer group transition-all duration-300"
          onClick={handleScrollToTop}
        >
          <ArrowUpIcon className="h-4 w-4" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:mr-2 transition-all duration-300">
            Top
          </span>
        </div>
      )}
    </>
  );
}