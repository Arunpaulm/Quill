import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL, options } from "../common";

import { Loader } from "../components/loader";

import Logo from "../assets/logo/logo512.png";

interface InputData {
  name: string;
  username: string;
  password: string;
  type: string;
}

const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  // signup
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmpasswordRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails")!);
    if (userDetails?.username) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const inputData: InputData = {
      name: nameRef.current?.value.toString() || "",
      username: emailRef.current?.value.toString() || "",
      password: passwordRef.current?.value.toString() || "",
      type: roleRef.current?.value.toString() || "Consumer",
    };

    console.log(inputData);

    if (inputData.password !== confirmpasswordRef.current?.value.toString()) {
      console.log("p - ", inputData.password);
      console.log("c - ", confirmpasswordRef.current?.value.toString());
      return toast.error("Password mismatch");
    }

    // register
    baseURL
      .post("/users/register", JSON.stringify(inputData), options)
      .then((response) => {
        toast.success("User registered successfully");
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Unable to register user");
        }
      });
  };

  return (
    <>
      {isLoading && <Loader></Loader>}
      <div className="flex items-center h-screen">
        <div className="mx-auto my-auto bg-white border-2 min-[320px]:w-full md:w-1/2 rounded-lg py-10 px-10">
          <div className="flex justify-center">
            <a href="#" className="m-1.5 p-1.5">
              <img className="h-20 w-auto" src={Logo} alt="" />
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-6">
              <div className="grid items-center justify-center">
                <h1 className="text-2xl font-semibold leading-7 text-gray-900 mx-auto">
                  Welcome to Quill
                </h1>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      ref={nameRef}
                      required
                      className="block w-full py-1.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email Address
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      ref={emailRef}
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
                      ref={passwordRef}
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
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="confirmpassword"
                      id="confirmpassword"
                      autoComplete="confirmpassword"
                      ref={confirmpasswordRef}
                      required
                      className="block w-full py-1.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Role
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      name="category"
                      autoComplete="category"
                      ref={roleRef}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option
                        defaultValue={"Consumer"}
                        value={undefined}
                        disabled
                      >
                        Select Role
                      </option>
                      <option>Consumer</option>
                      <option>Author</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-3">
              Already have an account?{" "}
              <a
                href="#"
                onClick={() => navigate("/")}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </a>
            </p>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
