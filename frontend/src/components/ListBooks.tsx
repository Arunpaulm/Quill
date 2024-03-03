import React, { FunctionComponent } from "react";

import image1 from "../assets/books/image/thought-catalog-OJZB0VUQKKc-unsplash.jpg";

import { BookRecord } from "../interface";

type bookProps = {
  item: BookRecord;
  callback: Function;
};

export const ListBooks: FunctionComponent<bookProps> = ({ item, callback }) => {
  return (
    <div
      className="flex flex-col w-1/4 m-2 rounded-lg border-0 border-gray-200 bg-white shadow"
      key={item.id}
    >
      <img
        className="flex-1 rounded-t-lg object-cover"
        src={image1}
        alt={item.name}
      />

      <div className="flex-auto flex-col px-1 py-4 mx-3 mb-3 item-start content-between">
        <h5 className="flex-1 text-base font-semibold text-nowrap truncate hover:text-pretty text-gray-900 dark:text-white">
          {item.title || item.name}
        </h5>
        <h6 className="flex-auto text-sm line-clamp-3 text-gray-500 dark:text-white">
          {item.description}
        </h6>
      </div>

      <div className="flex flex-col m-2 items-start justify-items-center">
        <h6 className="flex-1 m-2 text-3l pb-3 text-nowrap truncate text-gray-700 dark:text-white">
          Author: {item.author}
        </h6>
        <a
          target="_blank"
          style={{ cursor: "pointer" }}
          onClick={() => {
            callback(item.url, item.name);
            // window.open(item.url, "_blank");
            // window.focus();
          }}
          className="w-full text-white bg-indigo-700 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          download
        >
          Download
        </a>
      </div>
    </div>
  );
};
