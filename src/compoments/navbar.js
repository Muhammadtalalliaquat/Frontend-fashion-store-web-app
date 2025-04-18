"use client";

import styles from "../compoments/main.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import OptionsMenu from "./options";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

// import ProductOptions from "./productOptions";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenubar = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavigate = () => {
    if (
      pathname === "/admin-add-product" ||
      pathname === "/account-details" ||
      pathname === "/productDetails" ||
      pathname === "/productCart" ||
      pathname === "/ordersPage" ||
      pathname === "/placeOrder" ||
      pathname === "/products" ||
      pathname.startsWith("/admin-update-product")
    ) {
      router.push("/fashion-store");
    }
    // console.log("Current Path:", pathname);
  };

  return (
    <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`${styles.logo} ${isScrolled ? styles.scrolled : ""}`}>
        <span className={`${styles.btn} ${isScrolled ? styles.scrolled : ""}`}>
          Fashion Store
        </span>
      </div>

      <ul
        className={`${styles.menu} ${isMenuOpen ? styles.menu_open : ""} ${
          isScrolled ? styles.scrolled : ""
        }`}
      >
        {/* <li
          className={
            pathname === "/fashion-store" ? `${styles.hide_on_mobile}` : ""
          }
          onClick={handleNavigate}
        >
          {pathname !== "/fashion-store" &&
            pathname !== "/adminDashboard" &&
            // !pathname.includes("/admin-update-product") &&
            "Home"}
        </li>

        <li
          className={pathname === "/products" ? `${styles.hide_on_mobile}` : ""}
        >
          <Link href="/products">
            {" "}
            {pathname !== "/products" && "products"}
          </Link>
        </li> */}
        {pathname !== "/fashion-store" && pathname !== "/adminDashboard" && (
          <li onClick={handleNavigate}>Home</li>
        )}

        {pathname !== "/products" && (
          <li>
            <Link href="/products">Products</Link>
          </li>
        )}

        <li>Shop</li>
        <li>Contact</li>
      </ul>

      <OptionsMenu />

      <button
        className={`${styles.hamburger} ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenubar}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <Image
            className={`${styles.closeMenustyle} ${
              isDarkTheme ? styles.dark : styles.light
            }`}
            width={15}
            height={15}
            src="https://i.postimg.cc/rsftGmBg/close.png"
            alt="Close Menu"
          />
        ) : (
          <Image
            className={`${styles.closeMenustyle} ${
              isDarkTheme ? styles.dark : styles.light
            }`}
            width={15}
            height={15}
            src="https://i.postimg.cc/FRtqmFnP/more.png"
            alt="Hamburger Menu"
          />
        )}
      </button>
    </div>
  );
}

export default Navbar;
