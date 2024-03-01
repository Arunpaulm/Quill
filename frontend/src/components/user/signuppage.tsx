import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Explore from "../explore/explore";
import SignIn from "./signinpage";
import { toast } from "react-toastify";
import Welcome from "../welcome/welcome";
import { baseURL, options } from "../common/common";

const SignUp: React.FC = () => {
    const [showSignIn, setShowSignIn] = useState(false);
    const [backToHome, setBackToHome] = useState(false);

    // signup
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLSelectElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const inputData = {
            name: nameRef.current?.value.toString() || "",
            username: emailRef.current?.value.toString() || "",
            password: passwordRef.current?.value.toString() || "",
            type: roleRef.current?.value.toString() || "",
        };
        // register
        baseURL.post('/users/register',JSON.stringify(inputData), options).then(response => {
            toast("User registered successfully");
            alert("User registered successfully")
            setShowSignIn(true);
        }).catch(error => {
            if (error.response) {
                toast("Unable to register user");
            }
        })
    }

    return (
        <>
            {!showSignIn && !backToHome && (
                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-10 lg:px-8 bg-white border-2 rounded-lg mt-5">
                    <div className="mx-auto max-w-2xl">
                        <form onSubmit={handleSubmit}>
                            <div className="pb-12">
                                <div className="grid items-center justify-center">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900 mx-auto">Welcome to E-Book Vault</h2>
                                </div>
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-6">
                                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                autoComplete="title"
                                                ref={nameRef}
                                                required
                                                className="block w-full py-1.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
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
                                                <option>Consumer</option>
                                                <option>Author</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="#" onClick={() => setShowSignIn(true)} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                            </p>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => setBackToHome(true)}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showSignIn && !backToHome && (
                <SignIn></SignIn>
            )}
            {
                backToHome && <Welcome></Welcome>
            }
        </>


    )
}

export default SignUp;