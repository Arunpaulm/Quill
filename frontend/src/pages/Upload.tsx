import React, { useState } from "react";
import Welcome from "../components/welcome/welcome";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../components/common/common";
import { FindBook } from "./FindBook";
import { Loader } from "../components/loader";
import { useNavigate } from "react-router-dom";

export const Upload: React.FC = () => {
  const [backToHome, setBackToHome] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [showExplore, setShowExplore] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userDetails")!)!;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    (event.target as HTMLInputElement).value = "";
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!file) {
      toast.warn("Please upload a file!");
      return;
    } else {
      const formData = new FormData();
      formData.append("file", file);
      // formData.append()
      const authHeaders = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Content_Type: "multipart/form-data",
        },
      };
      baseURL.post("/books/upload", formData, authHeaders).then(
        (response) => {
          console.log(response);
          toast.success("File uploaded successfully");
          // alert("File uploaded successfully");
          localStorage.removeItem("books");
          setIsLoading(false);
          navigate("/library");
        },
        (error) => {
          console.log(error);
          // alert(error.message);
          toast.error(error.message);
          setIsLoading(false);
        },
      );
    }
  };
  return (
    <>
      {isLoading && <Loader></Loader>}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-10 lg:px-8 bg-white border-2 rounded-lg mt-20 mb-10">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="space-y-12">
              <div className="pb-2">
                <div className="grid items-center justify-center">
                  <h1 className="text-base font-bold leading-7 text-gray-900 mx-auto">
                    Upload an E-Book
                  </h1>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly.
                  </p>
                </div>
                <div className="col-span-full mt-4">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Select a file to upload
                  </label>
                  <div className="flex items-center justify-center w-full mt-2">
                    <label className="flex flex-col items-center justify-center w-full h-55 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {file ? (
                          <>
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">{file.name}</span>
                            </p>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onClick={handleFileInputClick}
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="grid items-center justify-center">
                  <h2 className="text-base font-semibold leading-7 text-gray-900 mx-auto">
                    Basic Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Details about the book. Be specific!
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="title"
                        className="block w-full py-1.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="author"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Author
                    </label>
                    <div className="mt-2">
                      <input
                        value={userInfo.name}
                        type="text"
                        name="author"
                        id="author"
                        autoComplete="author"
                        className="block w-full py-1.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        disabled
                      />
                    </div>
                  </div>

                  {/* <div className="sm:col-span-6">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>
                    <div className="mt-2">
                      <select
                        id="category"
                        name="category"
                        autoComplete="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      >
                        <option>Fiction</option>
                        <option>Non-fiction</option>
                        <option>Mystery</option>
                        <option>Thriller</option>
                        <option>Romance</option>
                        <option>Science Fiction</option>
                      </select>
                    </div>
                  </div> */}

                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        autoComplete="description"
                        className="block w-full p-6 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => setBackToHome(true)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
