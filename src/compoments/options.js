import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoIosSettings } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { GrUserAdmin } from "react-icons/gr";
import { useEffect, useState } from "react";
import { AiFillProduct } from "react-icons/ai";

export default function OptionsMenu() {
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

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50">
          Options
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              href="/account-details"
              className="flex items-center gap-2 font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <IoIosSettings size={18} className="text-gray-500" />
              Account settings
            </Link>
          </MenuItem>
        </div>

        <div className="py-1">
          <MenuItem>
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <LuLogIn size={18} className="text-gray-500" />
              Log in
            </Link>
          </MenuItem>
        </div>

        <div className="py-1">
          <MenuItem>
            <Link
              onClick={logOut}
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <LuLogIn size={18} className="text-red-500" />
              Sign out
            </Link>
          </MenuItem>
        </div>
        {user && (
          <div className="py-1">
            <MenuItem>
              <Link
                href="/productCart"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <AiFillProduct color="blue" />
                Cart items
              </Link>
            </MenuItem>
          </div>
        )}

        {user && (
          <div className="py-1">
            <MenuItem>
              <Link
                href="/ordersPage"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <GrUserAdmin />
                Orders histore
              </Link>
            </MenuItem>
          </div>
        )}
      </MenuItems>
    </Menu>
  );
}
