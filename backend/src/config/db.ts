import mongoose from "mongoose";

export const connectDB = async () => {
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;

  try {
    await mongoose.connect(`mongodb+srv://${username}:${password}@matrix.yrnd5ce.mongodb.net/${database}`,
      { useUnifiedTopology: true, useNewUrlParser: true }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
