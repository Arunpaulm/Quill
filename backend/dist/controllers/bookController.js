"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const storage_1 = require("@google-cloud/storage"); // Import Firebase Storage
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const bookModel_1 = require("../models/bookModel"); // Import the UploadedFile model
// Initialize Firebase Storage
const storage = new storage_1.Storage({
    // keyFilename: path.join(__dirname, "path/to/serviceAccountKey.json"), // Provide the path to your service account key
    keyFilename: path_1.default.join(__dirname, "../../config/trusty-matrix-415912-e19b848a3c5c.json"), // Provide the path to your service account key
});
const bucketName = process.env.STORAGE_BUCKET; // Update with your Firebase Storage bucket name
/**
 *
 * @param req
 * @param res
 * @returns API response in JSON
 */
const uploadFile = async (req, res) => {
    var _a, _b, _c;
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        console.log(req.body.author);
        const file = req.file;
        const fileName = `${(0, uuid_1.v4)()}-${file.originalname}`;
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
        const newFile = new bookModel_1.Book({
            id: (0, uuid_1.v4)(),
            name: file.originalname,
            title: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title,
            url: uploadedFile[0].metadata.mediaLink,
            author: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.author,
            description: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.description
        });
        // Save the UploadedFile document to MongoDB
        await newFile.save();
        // Delete the local file after uploading to Firebase
        // fs.unlinkSync(file.path);
        res
            .status(200)
            .json({ message: "File uploaded successfully", fileId: newFile.id });
    }
    catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.uploadFile = uploadFile;
