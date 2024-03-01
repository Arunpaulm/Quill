import { Schema, model, Document, Model } from "mongoose";

// Define the interface for the User Record
interface IUser extends Document {
  id: string;
  username: string;
  password: string;
  name: string;
  type: "Author" | "Consumer";
}

// Define the schema for the User collection
const UserSchema = new Schema<IUser>({
  id: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ["Author", "Consumer"], required: true },
});

// Define and export the User model
export const User: Model<IUser> = model<IUser>(
  "User",
  UserSchema
);
