import { Request, Response } from "express";
import { Storage } from "@google-cloud/storage"; // Import Firebase Storage
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { Book } from "../models/bookModel"; // Import the UploadedFile model

// Initialize Firebase Storage
const storage = new Storage({
  // keyFilename: path.join(__dirname, "path/to/serviceAccountKey.json"), // Provide the path to your service account key
  keyFilename: path.join(__dirname, "../../config/trusty-matrix-415912-e19b848a3c5c.json"), // Provide the path to your service account key
});

const bucketName = process.env.STORAGE_BUCKET; // Update with your Firebase Storage bucket name

/**
 * 
 * @param req 
 * @param res 
 * @returns API response in JSON
 */
export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log(req.body.author)

    const file = req.file;
    const fileName = `${uuidv4()}-${file.originalname}`;
    // console.log(bucketName)

    // Upload file to Firebase Storage
    const uploadedFile = await storage.bucket(bucketName).upload(file.path, {
      destination: fileName,
      metadata: {
        contentType: file.mimetype,
      },
    });

    await storage.bucket(bucketName).file(uploadedFile[0].id).makePublic();

    // Create a new UploadedFile document
    const newFile = new Book({
      id: uuidv4(), // Unique ID for the file
      name: file.originalname,
      title: req?.body?.title,
      url: uploadedFile[0].metadata.mediaLink, // Firebase URL of the uploaded file
      author: req?.body?.author,
      description: req?.body?.description
    });

    // Save the UploadedFile document to MongoDB
    await newFile.save();

    // Delete the local file after uploading to Firebase
    // fs.unlinkSync(file.path);

    res
      .status(200)
      .json({ message: "File uploaded successfully", fileId: newFile.id });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
