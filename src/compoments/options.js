import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OptionsMenu() {

  const dispatch = useDispatch();
  const router = useRouter();

  const logOut = () => {
    dispatch(clearUser())
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
          Options
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Acount settings
            </Link>
          </MenuItem>
          
        </div>
        <div className="py-1">
          <MenuItem>
            <Link
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Log in
            </Link>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <Link onClick={logOut}
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Sign out
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
