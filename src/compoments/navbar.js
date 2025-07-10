"use client";

import styles from "../compoments/main.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import OptionsMenu from "./options";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";
import { Package } from "lucide-react";
import { GoHome } from "react-icons/go";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RiContactsLine } from "react-icons/ri";
import { RiFunctionAddLine } from "react-icons/ri";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setLoadingUser(false);
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
      pathname === "/adminDashboard" ||
      pathname === "/productCart" ||
      pathname === "/ordersPage" ||
      pathname === "/placeOrder" ||
      pathname === "/products" ||
      pathname === "/contact" ||
      pathname === "/returnsPolicy" ||
      pathname === "/shippingInfo" ||
      pathname === "/shop" ||
      pathname === "/discountProductInfo" ||
      pathname.startsWith("/admin-update-product")
    ) {
      router.push("/fashion-store");
    }
  };
  if (loadingUser) return null;
  return (
    <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`${styles.logo} ${isScrolled ? styles.scrolled : ""}`}>
        <span className={`${styles.btn} ${isScrolled ? styles.scrolled : ""}`}>
          Fashion Store
        </span>

        {user?.isAdmin === true && pathname !== "/admin-add-product" && (
          <abbr title="Add Product">
            <button
              onClick={() => router.push("/admin-add-product")}
              className="hidden sm:flex group w-36 items-center justify-start px-2 py-1 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out overflow-hidden"
            >
              <IoAdd size={20} className="z-10" />
              <span className="ml-2 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 whitespace-nowrap">
                Add Product
              </span>
            </button>
          </abbr>
        )}
      </div>

      <ul
        className={`${styles.menu} ${isMenuOpen ? styles.menu_open : ""} ${
          isScrolled ? styles.scrolled : ""
        }`}
      >
        {pathname !== "/fashion-store" && (
          <li onClick={handleNavigate} className="flex items-center gap-2">
            {isMenuOpen && <GoHome className="w-5 h-5 text-blue-750" />}
            <span>Home</span>
          </li>
        )}
        {pathname !== "/products" && (
          <li className="flex items-center gap-2">
            <Link href="/products" className="flex items-center gap-2">
              {isMenuOpen && <Package className="w-5 h-5 text-blue-750" />}
              {pathname !== "/products" && "products"}
            </Link>
          </li>
        )}

        {pathname !== "/shop" && (
          <li className="flex items-center gap-2">
            <Link href="/shop" className="flex items-center gap-2">
              {isMenuOpen && (
                <LiaShoppingBagSolid className="w-5 h-5 text-blue-750" />
              )}
              <span>Shop</span>
            </Link>
          </li>
        )}

        {pathname !== "/contact" && (
          <li className="flex items-center gap-2">
            {isMenuOpen && <RiContactsLine className="w-5 h-5 text-blue-750" />}
            <Link href={"/contact"}>
              <span>Contact</span>
            </Link>
          </li>
        )}

        {user?.isAdmin === true &&
          pathname !== "/admin-add-product" &&
          isMenuOpen && (
            <li className="flex items-center gap-2 sm:hidden">
              <Link
                href="/admin-add-product"
                className="flex items-center gap-2"
              >
                <RiFunctionAddLine className="w-5 h-5 text-blue-750" />
                <span>Add Product</span>
              </Link>
            </li>
          )}

        {isMenuOpen && (
          <div className="sm:hidden">
            <OptionsMenu isMenuOpen={isMenuOpen} isScrolled={isScrolled} />
          </div>
        )}
      </ul>

      {/* Always render OptionsMenu on desktop */}
      <div className="hidden sm:block">
        <OptionsMenu isMenuOpen={isMenuOpen} isScrolled={isScrolled} />
      </div>
      <button
        className={styles.hamburger}
        onClick={toggleMenubar}
        aria-label="Toggle menu"
      >
        <div className={styles.iconWrapper}>
          <Image
            src="https://i.postimg.cc/FRtqmFnP/more.png"
            alt="Hamburger Icon"
            width={15}
            height={15}
            className={`${styles.icon} ${
              !isMenuOpen ? styles.show : styles.hide
            }`}
          />
          <Image
            src="https://i.postimg.cc/rsftGmBg/close.png"
            alt="Close Icon"
            width={15}
            height={15}
            className={`${styles.icon} ${
              isMenuOpen ? styles.show : styles.hide
            }`}
          />
        </div>
      </button>

      {/* <button
        className={`${styles.hamburger} ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenubar}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <Image
            className={`${styles.closeMenustyle}`}
            width={15}
            height={15}
            src="https://i.postimg.cc/rsftGmBg/close.png"
            alt="Close Menu"
          />
        ) : (
          <Image
            className={`${styles.closeMenustyle}`}
            width={15}
            height={15}
            src="https://i.postimg.cc/FRtqmFnP/more.png"
            alt="Hamburger Menu"
          />
        )}
      </button> */}
    </div>
  );
}

export default Navbar;
