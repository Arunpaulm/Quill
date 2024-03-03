import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { baseURL, options } from "../common";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/loader";

import Logo from "../assets/logo/logo512.png";

export const Login: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails")!);
    if (userDetails?.username) {
      navigate("/home");
    }
  }, []);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const signInInputData = {
      username: usernameRef.current?.value.toString() || "",
      password: passRef.current?.value.toString() || "",
    };

    // signin
    baseURL
      .post("/auth/login", JSON.stringify(signInInputData), options)
      .then((response: any) => {
        // alert(response.data.message);
        localStorage.setItem("userDetails", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        toast.success(response.data.message);
        navigate("/home");
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setIsLoading(false);
          toast.error("Invalid username and password.");
          console.log(error.response.data);
        }
      });
  };

  return (
    <>
      {isLoading && <Loader></Loader>}
      <div className="flex items-center h-screen">
        <div className="mx-auto my-auto bg-white border-2 min-[300px]:w-full sm:w-1/3 sm:max-2xl:w-1/2 rounded-lg py-10 px-10">
          <div className="flex justify-center">
            <a href="#" className="m-1.5 p-1.5">
              <img className="h-20 w-auto" src={Logo} alt="" />
            </a>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <div className="mt-6 pb-12">
              <div className="grid items-center justify-center">
                <h1 className="text-2xl font-semibold leading-7 text-gray-900 mx-auto">
                  Welcome to Quill
                </h1>
              </div>

              <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      ref={usernameRef}
                      required
                      className="block w-full py-1.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="password"
                      ref={passRef}
                      required
                      className="block w-full py-1.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-2 w-full flex flex-col items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md w-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </button>

              <button
                type="button"
                className="rounded-md w-full mt-4 bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => navigate("/signup")}
              >
                Create an account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
