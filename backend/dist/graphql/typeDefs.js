"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Book {
    id: ID!
    name: String!
    title: String!
    url: String!
    author: String!
    description: String
  }

  input CreateBookInput {
    id: String!
    name: String!
    title: String!
    url: String!
    author: String!
    description: String
  }

  input UpdateBookInput {
    id: ID!
    name: String
    url: String
    author: String
    description: String
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book!
    updateBook(id: ID!, input: UpdateBookInput!): Book!
    deleteBook(id: ID!): Boolean!
  }
`;
