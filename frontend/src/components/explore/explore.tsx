import React, { useEffect, useState } from "react";
import image1 from "../../assets/books/image/thought-catalog-OJZB0VUQKKc-unsplash.jpg";
import image2 from "../../assets/books/image/book-3610618_640.jpg";
import image3 from "../../assets/books/image/book-4241964_640.jpg";
import image4 from "../../assets/books/image/images.jpg";
import image5 from "../../assets/books/image/pexels-pixabay-159866.jpg";
import axios from "axios";
import { gql, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import Welcome from "../welcome/welcome";
import { GET_BOOKS } from "../common/common";

let items: Item[] = [];

const images = [image1, image2, image3, image4, image5];

const Explore: React.FC<ExploreProps> = ({ bookKeywords }) => {
    const [backToHome, setBackToHome] = useState(false);

    /**
     * Fetching list of uploaded books from the server and filtering them by keywords if provided
     */

    const { data, loading, error } = useQuery(GET_BOOKS);
    // if (error) {
    //     setBackToHome(true);
    //     toast("Unable to fetch books: " + error.message)
    // }
    items = JSON.parse(localStorage.getItem("books")!)
    if (!loading && localStorage.getItem("books") === null && data) {
        localStorage.setItem("books", JSON.stringify(data.books))
        items = data.books;
    }

    const [searchTerm, setSearchTerm] = React.useState(() => {
        if (bookKeywords !== undefined && bookKeywords !== "") {
            return bookKeywords;
        }
        return "";
    });

    console.log(items);

    const onButtonClick = async (url: string, name: string) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(await (await fetch(url)).blob());
        a.download = name;
        a.click();
        URL.revokeObjectURL(a.href);
        // const config = {
        //     responseType: 'blob' as const,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/pdf'
        //     }
        // };
        // axios.get('', config).then((resp) => {
        //     const url = window.URL.createObjectURL(new Blob([resp.data], { type: resp.headers['content-type'] }));
        //     const link = document.createElement("a");
        //     link.href = url;
        //     link.setAttribute('download', title);
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
        //     window.URL.revokeObjectURL(url);
        // })
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-10 lg:px-8 bg-white border-2 rounded-lg mt-5">
            <form className="max-w-md mx-auto mt-4">
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Books" required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800" >Search</button>
                </div>
            </form>
            <div className="flex flex-wrap mt-2">
                {items && items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((item, i) => (
                    <div className="w-1/4 mt-5 flex" key={item.id}>
                        <div className="rounded-lg border-0 border-gray-200 max-w-sm bg-white shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                            <a href={item.url}>
                                <img className="p-8 rounded-t-lg" src={images[Math.floor(Math.random() * images.length)]} alt={item.name} />
                            </a>
                            <div className="px-5 pb-5">
                                {/* <a href={item.url}> */}
                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                                {/* </a> */}
                                <span className="text-3l text-gray-900 dark:text-white">{item.author}</span>
                                <div className="mt-4">
                                    <a target="_blank" onClick={() => {
                                        onButtonClick(item.url, item.name);
                                        window.open(item.url, '_blank');
                                        window.focus();
                                    }} className="mx-6 text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" download>Download</a>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default Explore;

export interface Item {
    id: number;
    name: string;
    rating: number;
    url: string;
    author: string;
}

interface ExploreProps {
    bookKeywords: string | undefined;
}