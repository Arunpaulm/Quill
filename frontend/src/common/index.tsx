import { gql } from "@apollo/client";
import axios from "axios";

export const GET_BOOKS = gql`
  query {
    books {
      id
      name
      url
      title
      author
      uploadedBy
      description
    }
  }
`;

export const baseURL = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

export const options = {
  headers: {
    "Content-Type": "application/json",
  },
};
