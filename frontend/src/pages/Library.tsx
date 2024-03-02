import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import image2 from "../assets/books/image/book-3610618_640.jpg";
import image3 from "../assets/books/image/book-4241964_640.jpg";
import image4 from "../assets/books/image/images.jpg";
import image5 from "../assets/books/image/pexels-pixabay-159866.jpg";
import image1 from "../assets/books/image/thought-catalog-OJZB0VUQKKc-unsplash.jpg";
import { GET_BOOKS } from "../components/common/common";
import { Item } from "./FindBook";

export const Library: React.FC = () => {
  const images = [image1, image2, image3, image4, image5];

  let items: Item[] = [];

  const bookSections = ["All", "Uploaded"];
  /**
   * Fetching list of uploaded books from the server and filtering them by keywords if provided
   */

  const { data, loading, error } = useQuery(GET_BOOKS);
  // if (error) {
  //     setBackToHome(true);
  //     toast("Unable to fetch books: " + error.message)
  // }
  items = JSON.parse(localStorage.getItem("books")!) ?? [];
  const userDetails = JSON.parse(localStorage.getItem("userDetails")!);
  if (userDetails?.type === "Author") {
    if (!bookSections.includes("Uploaded")) {
      bookSections.push("Uploaded");
    }
  }
  if (!loading && localStorage.getItem("books") === null && data) {
    localStorage.setItem("books", JSON.stringify(data.books));
    items = data.books;
  }

  const [selectedButton, setSelectedButton] = useState(bookSections[0]);
  const handleButtonClick = (button: string) => {
    setSelectedButton(button);
  };

  const getButtonStyle = (button: string) => {
    if (selectedButton === button) {
      return "px-5 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900 rounded-lg";
    } else {
      return "px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-10 lg:px-8 bg-white rounded-lg mt-9">
      {/* <div className="max-w-md mx-auto mt-4">
        <div
          className="grid max-w-xs grid-cols-2 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600"
          role="group"
        >
          {bookSections.map((section) => (
            <button
              type="button"
              className={getButtonStyle(section)}
              onClick={() => handleButtonClick(section)}
            >
              {section}
            </button>
          ))}
        </div>
      </div> */}
      <div className="flex flex-wrap mt-2">
        {items.map((item, i) => (
          <div className="w-1/4 mt-5 flex" key={item.id}>
            <div className="rounded-lg border-0 border-gray-200 max-w-sm bg-white shadow dark:bg-gray-800 dark:border-gray-700 m-2">
              <img
                className="p-8 rounded-t-lg"
                src={images[Math.floor(Math.random() * images.length)]}
                alt={item.name}
              />
              <div className="px-5 pb-5 h-16">
                <a href={item.url}>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                </a>
                <span className="text-3l text-gray-900 dark:text-white">
                  {item.author}
                </span>
              </div>
              <div className="mt-5">
                <a
                  href={item.url}
                  target="_blank"
                  className="mx-6 text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
