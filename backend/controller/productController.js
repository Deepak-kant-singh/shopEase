// Import utility function for uploading to Cloudinary
import uploadOnCloudinary from "../config/cloudinary.js";
// Import Product model for MongoDB
import Product from "../model/productModel.js";
// Import file system module to handle temporary file deletion
import fs from "fs";

// ============== ADD PRODUCT ==============

export const addProduct = async (req, res) => {
  try {
    // Destructure product fields from the request body
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    console.log("📤 File Paths:");
    const files = req.files;

    // Safely extract file paths for each uploaded image using optional chaining
    const imagePaths = [
      files.image1?.[0]?.path,
      files.image2?.[0]?.path,
      files.image3?.[0]?.path,
      files.image4?.[0]?.path,
    ];

    // Log the extracted file paths to debug uploads
    imagePaths.forEach((path, i) => console.log(`image${i + 1}:`, path));

    // Upload each image path to Cloudinary; if no path, return null
    const uploadedImages = await Promise.all(
      imagePaths.map((path) => (path ? uploadOnCloudinary(path) : null))
    );

    // Delete temporary uploaded files from server after upload to Cloudinary
    imagePaths.forEach((path) => {
      if (path && fs.existsSync(path)) {
        fs.unlinkSync(path); // Remove temp file from disk
      }
    });

    // Construct product data object to be stored in DB
    const productData = {
      name,
      description,
      price: Number(price), // Convert price from string to number
      category,
      subCategory,
      sizes: JSON.parse(sizes), // Convert JSON string of sizes to array
      bestseller: bestseller === "true", // Convert string to boolean
      date: Date.now(), // Current timestamp
      image1: uploadedImages[0],
      image2: uploadedImages[1],
      image3: uploadedImages[2],
      image4: uploadedImages[3],
    };

    // Create product in MongoDB
    const product = await Product.create(productData);

    // Send success response with created product
    return res.status(201).json(product);

  } catch (error) {
    // Catch any error and return failure response
    console.error("AddProduct error:", error);
    return res.status(500).json({ message: "AddProduct failed", error: error.message });
  }
};

// ============== LIST ALL PRODUCTS ==============

export const listProduct = async (req, res) => {
  try {
    // Find and return all products in the database
    const product = await Product.find({});
    return res.status(200).json(product);
  } catch (error) {
    console.log("ListProduct error");
    return res.status(500).json({ message: `ListProduct error ${error}` });
  }
};

// ============== REMOVE PRODUCT BY ID ==============

export const removeProduct = async (req, res) => {
  try {
    // Extract product ID from request parameters
    const { id } = req.params;

    // Delete product from DB using the ID
    const product = await Product.findByIdAndDelete(id);

    // Return deleted product details as response
    return res.status(200).json(product);

  } catch (error) {
    console.log("RemoveProduct error");
    return res.status(500).json({ message: `RemoveProduct error ${error}` });
  }
};
