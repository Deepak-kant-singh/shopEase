// config/cloudinary.js

// Import required modules
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// 🔐 Configure cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,       // e.g., "mycloudname"
  api_key: process.env.CLOUDINARY_API_KEY,       // e.g., "123456789"
  api_secret: process.env.CLOUDINARY_API_SECRET, // e.g., "mysecretkey"
});

// ✅ Function to upload a file to Cloudinary
const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null; // Skip if no file path is provided

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath);

    // Return the secure (HTTPS) URL of the uploaded image
    return result.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);
    throw error; // Optional: forward error to be handled by the calling function
  }
};

export default uploadOnCloudinary;
