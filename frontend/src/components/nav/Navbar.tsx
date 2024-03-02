// import { Bars3Icon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/logo/logo512.png";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Find Book", href: "/find" },
  { name: "Library", href: "/library" },
  { name: "Upload", href: "/upload" },
  { name: "Profile", href: "/profile" },
];

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [menuItem, setMenuItem] = useState<number>(0);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="m-1.5 p-1.5" onClick={() => setMenuItem(0)}>
            <img className="h-8 w-auto" src={Logo} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMenuItem(index)}
              className="py-2 px-4 rounded-lg text-sm font-semibold leading-6 hover:bg-indigo-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-white-100 dark:hover:bg-red-700 dark:focus:ring-blue-800"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <button
            type="submit"
            onClick={() => {
              localStorage.clear();
              toast.success("User logged out");
              navigate("/");
            }}
            className="text-white absolute end-2.5 top-4 bg-red-600 hover:bg-red-100 hover:text-red-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
          >
            Logout
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <img className="h-20 w-auto" src={Logo} alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
