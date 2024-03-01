import { Book } from '../models/bookModel';

export const resolvers = {
    Query: {
        books: async () => await Book.find(),
        book: async (_: any, { id }: { id: string }) => await Book.findById(id),
    },
    Mutation: {
        createBook: async (_: any, { input }: { input: any }) => {
            const newBook = new Book(input);
            return await newBook.save();
        },
        updateBook: async (_: any, { id, input }: { id: string, input: any }) => {
            return await Book.findByIdAndUpdate(id, input, { new: true });
        },
        deleteBook: async (_: any, { id }: { id: string }) => {
            const deletedBook = await Book.findByIdAndDelete(id);
            return !!deletedBook; // Return true if deleted, false otherwise
        },
    },
};
