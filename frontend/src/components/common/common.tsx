import { gql } from "@apollo/client";
import axios from "axios";
import React from "react";

export const GET_BOOKS = gql`
  query GET_BOOKS {
    books {
      id
      name
      url
      description
    }
  }
`;

export const baseURL = axios.create({
  baseURL: "https://quill-ca113-sd7tjm4hyq-nw.a.run.app"
})

export const options = {
  headers: {
    'Content-Type': 'application/json'
  }
}

