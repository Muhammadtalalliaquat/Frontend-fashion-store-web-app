import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Menu,
  MenuItem,
  Button,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";

import { IoIosSettings } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { ShoppingCart } from "lucide-react";
import { GrUserAdmin } from "react-icons/gr";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const logOut = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // ----------------- MENU CONFIG -----------------
  const menuItems = [
    user && {
      label: "Account settings",
      icon: <IoIosSettings size={18} className="text-gray-500" />,
      href: "/account-details",
    },
    {
      label: "Log in",
      icon: <LuLogIn size={18} className="text-gray-500" />,
      href: "/login",
    },
    {
      label: "Sign out",
      icon: <LuLogIn size={18} className="text-red-500" />,
      href: "/",
      action: logOut,
      color: "error",
    },
    user && "divider",
    user && {
      label: "Cart items",
      icon: <ShoppingCart size={19} className="text-blue-600" />,
      href: "/productCart",
    },
    user && {
      label: "Orders history",
      icon: <GrUserAdmin size={18} />,
      href: "/ordersPage",
    },
    user?.isAdmin && "divider",
    user?.isAdmin && {
      label: "Customers issues",
      icon: <HiOutlineExclamationCircle size={20} color="red" />,
      href: "/adminDashboard",
      hover: "#fee2e2",
    },
  ].filter(Boolean); // remove null/false
  // ------------------------------------------------

  return (
    <>
      {/* Menu Button */}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        sx={{
          textTransform: "capitalize",
          borderRadius: "6px",
          fontSize: { sm: "small" },
        }}
      >
        Menu
      </Button>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: { mt: 1, borderRadius: 2, minWidth: 200 },
        }}
      >
        {menuItems.map((item, index) =>
          item === "divider" ? (
            <Divider key={`divider-${index}`} />
          ) : (
            <MenuItem
              key={index}
              component={Link}
              href={item.href}
              onClick={() => {
                item?.action?.();
                handleClose();
              }}
              sx={
                item.hover ? { "&:hover": { backgroundColor: item.hover } } : {}
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Typography
                fontWeight="500"
                color={item.color ? item.color : "inherit"}
              >
                {item.label}
              </Typography>
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
}






















// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { useDispatch } from "react-redux";
// import { clearUser } from "@/store/features/userSlice";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { IoIosSettings } from "react-icons/io";
// import { LuLogIn } from "react-icons/lu";
// import { GrUserAdmin } from "react-icons/gr";
// import { useEffect, useState } from "react";
// // import { AiFillProduct } from "react-icons/ai";
// import { ShoppingCart } from "lucide-react";
// import { HiOutlineExclamationCircle } from "react-icons/hi";

// export default function OptionsMenu() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   const logOut = () => {
//     dispatch(clearUser());
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     router.push("/");
//   };

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//   }, []);

//   return (
//     <Menu as="div" className="relative inline-block text-left ml-3">
//       <div>
//         <MenuButton className="inline-flex  items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-800 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50">
//           Menu
//           <ChevronDownIcon
//             aria-hidden="true"
//             className="ml-9 size-5 text-blue-800"
//           />
//         </MenuButton>
//       </div>

//       <MenuItems
//         transition
//         className="absolute left-0 sm:right-0 sm:left-auto z-10 mt-2 w-56 origin-top-left sm:origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 overflow-y-auto max-h-60 sm:max-h-80 focus:outline-none"
//         // className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 overflow-y-auto max-h-60 sm:max-h-80 focus:outline-none"
//         // className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
//       >
//         {user && (
//           <div className="py-1">
//             <MenuItem>
//               <Link
//                 href="/account-details"
//                 className="flex items-center gap-2 font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-gray-900"
//               >
//                 <IoIosSettings size={18} className="text-gray-500" />
//                 Account settings
//               </Link>
//             </MenuItem>
//           </div>
//         )}

//         <div className="py-1">
//           <MenuItem>
//             <Link
//               href="/login"
//               className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-gray-900"
//             >
//               <LuLogIn size={18} className="text-gray-500" />
//               Log in
//             </Link>
//           </MenuItem>
//         </div>

//         <div className="py-1">
//           <MenuItem>
//             <Link
//               onClick={logOut}
//               href="/"
//               className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-gray-900"
//             >
//               <LuLogIn size={18} className="text-red-500" />
//               Sign out
//             </Link>
//           </MenuItem>
//         </div>
//         {user && (
//           <div className="py-1">
//             <MenuItem>
//               <Link
//                 href="/productCart"
//                 className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-gray-900"
//               >
//                 {/* <AiFillProduct color="blue" /> */}
//                 <ShoppingCart className="text-blue-600" size={19} />
//                 Cart items
//               </Link>
//             </MenuItem>
//           </div>
//         )}

//         {user && (
//           <div className="py-1">
//             <MenuItem>
//               <Link
//                 href="/ordersPage"
//                 className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-gray-900"
//               >
//                 <GrUserAdmin />
//                 Orders histore
//               </Link>
//             </MenuItem>
//           </div>
//         )}

//         {user && user.isAdmin === true && (
//           <div className="py-1">
//             <MenuItem>
//               <Link
//                 href="/adminDashboard"
//                 className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-gray-900"
//               >
//                 <HiOutlineExclamationCircle size={20} color="red" />
//                 Customers issues
//               </Link>
//             </MenuItem>
//           </div>
//         )}
//       </MenuItems>
//     </Menu>
//   );
// }
