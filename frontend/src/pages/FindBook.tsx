import React, { useRef } from "react";
import { useQuery } from "@apollo/client";

import { GET_BOOKS } from "../common";
import { BookRecord, ExploreProps } from "../interface";

import { ListBooks } from "../components/ListBooks";

let items: BookRecord[] = [];

export const FindBook: React.FC<ExploreProps> = ({ bookKeywords }) => {
  const searchRef = useRef<HTMLInputElement>(null);

  /**
   * Fetching list of uploaded books from the server and filtering them by keywords if provided
   */
  const { data, loading, error } = useQuery(GET_BOOKS);

  items = JSON.parse(localStorage.getItem("books")!) ?? [];
  if (!loading && localStorage.getItem("books") === null && data) {
    localStorage.setItem("books", JSON.stringify(data.books));
    items = data.books;
  }

  const [searchTerm, setSearchTerm] = React.useState(
    bookKeywords ? bookKeywords : "",
  );

  const onButtonClick = async (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(await (await fetch(url)).blob());
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleSearchSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setSearchTerm(searchRef?.current?.value.toString() || "");
  };

  const SearchField = (): JSX.Element => (
    <form className="max-w-md mx-auto mt-4" onSubmit={handleSearchSubmit}>
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
          ref={searchRef}
          autoFocus
          id="default-search"
          key="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(searchRef?.current?.value.toString() || "");
          }}
          placeholder="Search Books"
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-slate-500 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-10 lg:px-8 bg-white border-2 rounded-lg mt-16">
      <SearchField></SearchField>
      <div className="flex flex-wrap mt-12">
        {items &&
          items
            .filter((item) =>
              `${item.title} ${item.author}`
                .toLowerCase()
                .includes(searchTerm?.trim()?.toLowerCase()),
            )
            .map((item, i) => (
              <ListBooks
                key={"findbook lib" + i}
                item={item}
                callback={onButtonClick}
              ></ListBooks>
            ))}
      </div>
    </div>
  );
};
