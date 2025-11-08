"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import OptionsMenu from "./options";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setLoadingUser(false);

    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setUser]);

  const toggleDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  if (loadingUser) return null;

  // ✅ Menu Items
  const menuItems = [
    { label: "Home", path: "/fashion-store", icon: <HomeIcon /> },
    { label: "Products", path: "/products", icon: <InventoryIcon /> },
    { label: "Shop", path: "/shop", icon: <StoreIcon /> },
    { label: "Contact", path: "/contact", icon: <ContactMailIcon /> },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          backgroundColor: "#fff",
          color: "#000",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
            px: { xs: 1, sm: 2, md: 4 },
            py: { xs: 1, sm: 1.5 },
            gap: { xs: 1, sm: 2, md: 4, lg: 30 },
            // gap: { xs: 1, sm: 2, md: 30 },
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              color: "#1976d2",
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
              textAlign: "center",
            }}
            onClick={() => window.location.reload()}
          >
            Fashion Store
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: { xs: 1, sm: 2, md: 3 },
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {menuItems
              .filter((item) => pathname !== item.path)
              .map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: "#000",
                    fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
                    textTransform: "capitalize",
                    "&:hover": { color: "#1976d2" },
                  }}
                >
                  {item.label}
                </Button>
              ))}

            {/* Add Product (Admin Only) */}
            {user?.isAdmin && pathname !== "/admin-add-product" && (
              <Tooltip title="Add Product">
                <Button
                  onClick={() => router.push("/admin-add-product")}
                  variant="outlined"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.85rem" },
                    textTransform: "capitalize",
                    borderRadius: "6px",
                    borderColor: "#1976d2",
                    color: "#1976d2",
                    "&:hover": { backgroundColor: "#1976d2", color: "#fff" },
                  }}
                >
                  Add Product
                </Button>
              </Tooltip>
            )}

            <OptionsMenu isMenuOpen={true} isScrolled={isScrolled} />
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={toggleDrawer}
            sx={{
              display: { xs: "flex", sm: "none" },
              color: "#1976d2",
            }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ✅ Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 260,
          },
        }}
      >
        <Box role="presentation">
          <List>
            {menuItems
              .filter((item) => pathname !== item.path)
              .map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.path}
                    onClick={toggleDrawer}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}

            {user?.isAdmin && pathname !== "/admin-add-product" && (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    router.push("/admin-add-product");
                    toggleDrawer();
                  }}
                >
                  <ListItemIcon>
                    <AddCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Product" />
                </ListItemButton>
              </ListItem>
            )}

            <Box sx={{ p: 2 }}>
              <OptionsMenu isMenuOpen={true} isScrolled={isScrolled} />
            </Box>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;

// "use client";

// import styles from "../components/main.module.css";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import OptionsMenu from "./options";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";
// import { IoAdd } from "react-icons/io5";
// import { Package } from "lucide-react";
// import { GoHome } from "react-icons/go";
// import { LiaShoppingBagSolid } from "react-icons/lia";
// import { RiContactsLine } from "react-icons/ri";
// import { RiFunctionAddLine } from "react-icons/ri";

// function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [loadingUser, setLoadingUser] = useState(true);
//   const [user, setUser] = useState(null);
//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//     setLoadingUser(false);
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 30);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleMenubar = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   const handleNavigate = () => {
//     if (
//       pathname === "/admin-add-product" ||
//       pathname === "/account-details" ||
//       pathname === "/productDetails" ||
//       pathname === "/adminDashboard" ||
//       pathname === "/productCart" ||
//       pathname === "/ordersPage" ||
//       pathname === "/placeOrder" ||
//       pathname === "/products" ||
//       pathname === "/contact" ||
//       pathname === "/returnsPolicy" ||
//       pathname === "/shippingInfo" ||
//       pathname === "/shop" ||
//       pathname === "/discountProductInfo" ||
//       pathname.startsWith("/admin-update-product")
//     ) {
//       router.push("/fashion-store");
//     }
//   };
//   if (loadingUser) return null;
//   return (
//     <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
//       <div className={`${styles.logo} ${isScrolled ? styles.scrolled : ""}`}>
//         <span className={`${styles.btn} ${isScrolled ? styles.scrolled : ""}`}>
//           Fashion Store
//         </span>

//         {user?.isAdmin === true && pathname !== "/admin-add-product" && (
//           <abbr title="Add Product">
//             <button
//               onClick={() => router.push("/admin-add-product")}
//               className="hidden sm:flex group w-36 items-center justify-start px-2 py-1 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out overflow-hidden"
//             >
//               <IoAdd size={20} className="z-10" />
//               <span className="ml-2 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 whitespace-nowrap">
//                 Add Product
//               </span>
//             </button>
//           </abbr>
//         )}
//       </div>

//       <ul
//         className={`${styles.menu} ${isMenuOpen ? styles.menu_open : ""} ${
//           isScrolled ? styles.scrolled : ""
//         }`}
//       >
//         {pathname !== "/fashion-store" && (
//           <li onClick={handleNavigate} className="flex items-center gap-2">
//             {isMenuOpen && <GoHome className="w-4 h-4 text-blue-750" />}
//             <span>Home</span>
//           </li>
//         )}
//         {pathname !== "/products" && (
//           <li className="flex items-center gap-2">
//             <Link href="/products" className="flex items-center gap-2 w-full">
//               {isMenuOpen && <Package className="w-4 h-4 text-blue-750" />}
//               {pathname !== "/products" && "products"}
//             </Link>
//           </li>
//         )}

//         {pathname !== "/shop" && (
//           <li className="flex items-center gap-2">
//             <Link href="/shop" className="flex items-center gap-2 w-full">
//               {isMenuOpen && (
//                 <LiaShoppingBagSolid className="w-4 h-4 text-blue-750" />
//               )}
//               <span>Shop</span>
//             </Link>
//           </li>
//         )}

//         {pathname !== "/contact" && (
//           <li className="flex items-center gap-2">
//             {isMenuOpen && <RiContactsLine className="w-4 h-4 text-blue-750" />}
//             <Link className="w-full" href={"/contact"}>
//               <span>Contact</span>
//             </Link>
//           </li>
//         )}

//         {user?.isAdmin === true &&
//           pathname !== "/admin-add-product" &&
//           isMenuOpen && (
//             <li className="flex items-center gap-2 sm:hidden">
//               <Link
//                 href="/admin-add-product"
//                 className="flex items-center gap-2 w-full"
//               >
//                 <RiFunctionAddLine className="w-4 h-4 text-blue-750" />
//                 <span>Add Product</span>
//               </Link>
//             </li>
//           )}

//         {isMenuOpen && (
//           <div className="sm:hidden">
//             <OptionsMenu isMenuOpen={isMenuOpen} isScrolled={isScrolled} />
//           </div>
//         )}
//       </ul>

//       <div className="hidden sm:block">
//         <OptionsMenu isMenuOpen={isMenuOpen} isScrolled={isScrolled} />
//       </div>
//       <button
//         className={styles.hamburger}
//         onClick={toggleMenubar}
//         aria-label="Toggle menu"
//       >
//         <div className={styles.iconWrapper}>
//           <Image
//             src="https://i.postimg.cc/FRtqmFnP/more.png"
//             alt="Hamburger Icon"
//             width={15}
//             height={15}
//             className={`${styles.icon} ${
//               !isMenuOpen ? styles.show : styles.hide
//             }`}
//           />
//           <Image
//             src="https://i.postimg.cc/rsftGmBg/close.png"
//             alt="Close Icon"
//             width={15}
//             height={15}
//             className={`${styles.icon} ${
//               isMenuOpen ? styles.show : styles.hide
//             }`}
//           />
//         </div>
//       </button>

//       {/* <button
//         className={`${styles.hamburger} ${isMenuOpen ? "open" : ""}`}
//         onClick={toggleMenubar}
//         aria-label="Toggle menu"
//       >
//         {isMenuOpen ? (
//           <Image
//             className={`${styles.closeMenustyle}`}
//             width={15}
//             height={15}
//             src="https://i.postimg.cc/rsftGmBg/close.png"
//             alt="Close Menu"
//           />
//         ) : (
//           <Image
//             className={`${styles.closeMenustyle}`}
//             width={15}
//             height={15}
//             src="https://i.postimg.cc/FRtqmFnP/more.png"
//             alt="Hamburger Menu"
//           />
//         )}
//       </button> */}
//     </div>
//   );
// }

// export default Navbar;
