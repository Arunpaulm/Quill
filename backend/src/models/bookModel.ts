import { Schema, model, Document } from "mongoose";

// Define the interface for the UploadedFile document
interface IBookFile extends Document {
  id: string; // Unique ID for the file
  name: string; // Name of the uploaded file
  title: string; // Title of the uploaded file
  url: string; // Firebase URL of the uploaded file
  description: string; // Description about the book
  author: string; // book author
}

// Define the schema for the UploadedFile collection
const BookSchema = new Schema<IBookFile>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  author: { type: String },
});

// Define and export the UploadedFile model
export const Book = model<IBookFile>(
  "Book",
  BookSchema
);
