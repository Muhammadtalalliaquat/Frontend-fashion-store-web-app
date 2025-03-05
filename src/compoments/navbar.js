"use client";

import styles from "../compoments/main.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import OptionsMenu from "./options";


function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

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

  return (
    <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        <span className={styles.btn}>Fashion Store</span>
      </div>

      <ul className={`${styles.menu} ${isMenuOpen ? styles.menu_open : ""}`}>
        <li>
          <select
            className={styles.dropdownSelect}
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue) {
                router.push(selectedValue);
              }
            }}
          >
            <option value="">Product</option>
            <option value="/items/mens-watches">Men's Watches</option>
            <option value="/items/womens-watches">Women's Watches</option>
            <option value="/items/jewelry">Jewelry</option>
          </select>
        </li>
        <li>Shop</li>
        <li>Contact</li>
      </ul>

      {/* Right: Login Button */}
      {/* {!isMenuOpen && (
        <div
          className={styles.login}
          onClick={() => onScroll(sections.contact)}
        >
          Login
        </div>
      )} */}

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
