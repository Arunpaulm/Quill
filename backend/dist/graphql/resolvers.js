"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const bookModel_1 = require("../models/bookModel");
exports.resolvers = {
    Query: {
        books: async () => await bookModel_1.Book.find(),
        book: async (_, { id }) => await bookModel_1.Book.findById(id),
    },
    Mutation: {
        createBook: async (_, { input }) => {
            const newBook = new bookModel_1.Book(input);
            return await newBook.save();
        },
        updateBook: async (_, { id, input }) => {
            return await bookModel_1.Book.findByIdAndUpdate(id, input, { new: true });
        },
        deleteBook: async (_, { id }) => {
            const deletedBook = await bookModel_1.Book.findByIdAndDelete(id);
            return !!deletedBook; // Return true if deleted, false otherwise
        },
    },
};
