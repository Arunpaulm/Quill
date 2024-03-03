import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Book {
    id: ID!
    name: String!
    title: String!
    url: String!
    author: String!
    uploadedBy: String!
    description: String
  }

  input CreateBookInput {
    id: ID!
    name: String!
    title: String!
    url: String!
    author: String!
    uploadedBy: String!
    description: String
  }

  input UpdateBookInput {
    id: String
    name: String
    title: String
    url: String
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