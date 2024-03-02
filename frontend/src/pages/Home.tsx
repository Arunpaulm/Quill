import { useRef, useState } from "react";
import { toast } from "react-toastify";

// import Library from "./Library";

export const Home: React.FC = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const userDetails = localStorage.getItem("userDetails");
  let keywords = useRef<HTMLInputElement>(null).current?.value;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleSignUp = () => {
    if (userDetails !== null) {
      setShowExplore(true);
    } else {
      setShowSignUp(!showSignUp);
    }
  };

  const [menuItem, setMenuItem] = useState(0);

  return (
    <div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            E-Book Vault
          </h1>
          <p className="mt-6 text-lg leading-8">
            Unlock the world of knowledge with E-Book Vault, your digital
            library on the go!
          </p>

          <form className="max-w-md mx-auto mt-4">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                ref={keywords}
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Books"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                onClick={toggleSignUp}
              >
                Search
              </button>
            </div>
          </form>
          <p className="mt-6 text-lg leading-8 cursor-pointer">
            <a className="text-red-800" onClick={toggleSignUp}>
              <u>Get started</u>
            </a>
          </p>
        </div>
      </div>

      {/* <div className="relative isolate px-6 pt-14 lg:px-8">
        {menuItem == 0 && <Welcome></Welcome>}
        {userDetails !== null && menuItem === 1 ? (
          <Explore bookKeywords=""></Explore>
        ) : null}
        {userDetails !== null ? menuItem === 2 && <Library></Library> : null}
        {userDetails !== null
          ? menuItem === 4 && <BookUpload></BookUpload>
          : null}
        {userDetails !== null ? menuItem === 3 && <Profile></Profile> : null}
        {menuItem == 5 && <SignIn></SignIn>}
        {userDetails === null && menuItem !== 0 && <SignUp></SignUp>}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        ></div>
      </div> */}
    </div>
  );
};
