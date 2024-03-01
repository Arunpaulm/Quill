import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Book {
    id: ID!
    name: String!
    url: String!
    author: String!
    description: String
  }

  input CreateBookInput {
    id: String!
    name: String!
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