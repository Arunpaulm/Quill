import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Explore from "../explore/explore";
import Welcome from "../welcome/welcome";
import { baseURL, options} from "../common/common";

const SignIn: React.FC = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const [showExplore, setShowExplore] = useState(false);

    const [backToHome, setBackToHome] = useState(false);

    const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const signInInputData = {
            username: usernameRef.current?.value.toString() || "",
            password: passRef.current?.value.toString() || "",
        };

        // signin
        baseURL.post('/auth/login',JSON.stringify(signInInputData), options).then((response: any) => {
            alert(response.data.message)
            localStorage.setItem("userDetails", JSON.stringify(response.data.data))
            localStorage.setItem("token", response.data.token)
            console.log(response.data);
            setShowExplore(true);
        }).catch(error => {
            if (error.response) {
                toast("Invalid username and password.")
                console.log(error.response.data);
            }
        })
    }

    return (
        <>
            {!showExplore && !backToHome && <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-10 lg:px-8 bg-white border-2 rounded-lg mt-5">
                <div className="mx-auto max-w-2xl">
                    <form onSubmit={handleLoginSubmit}>
                        <div className="pb-12">
                            <div className="grid items-center justify-center">
                                <h2 className="text-base font-semibold leading-7 text-gray-900 mx-auto">Welcome to E-Book Vault</h2>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-6">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        username
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
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => setBackToHome(true)}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            }
            {
                showExplore &&  !backToHome && <Explore bookKeywords={''}></Explore>
            }
            {
                backToHome && <Welcome></Welcome>
            }
        </>


    )
}

export default SignIn;