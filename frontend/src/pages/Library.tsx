import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ListBooks } from "../components/ListBooks";
import { GET_BOOKS } from "../common";
import { BookRecord } from "../interface";

export const Library: React.FC = () => {
  let items: BookRecord[] = [];

  const bookSections = ["All", "Uploaded"];
  const userDetails = JSON.parse(localStorage.getItem("userDetails")!);

  /**
   * Fetching list of uploaded books from the server and filtering them by keywords if provided
   */
  const { data, loading, error } = useQuery(GET_BOOKS);

  items = JSON.parse(localStorage.getItem("books")!) ?? [];
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

  const onButtonClick = async (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(await (await fetch(url)).blob());
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-10 lg:px-8 bg-white rounded-lg border-2 mt-16">
      {userDetails?.type === "Author" && (
        <div className="max-w-md mx-auto mt-4">
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
        </div>
      )}

      <div className="flex flex-wrap mt-2">
        {items
          .filter(
            (item) =>
              selectedButton === "All" ||
              (selectedButton === "Uploaded" &&
                item.uploadedBy === userDetails.username),
          )
          .map((item, i) => (
            <ListBooks
              key={"listbook lib" + i}
              item={item}
              callback={onButtonClick}
            ></ListBooks>
          ))}
      </div>
    </div>
  );
};
