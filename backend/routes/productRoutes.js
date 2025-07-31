// Import express to use Router
import express from 'express';

// Import controller functions for product operations
import { addProduct, listProduct, removeProduct } from '../controller/productController.js';

// Import multer middleware for handling file uploads (for product images)
import upload from '../middleware/multer.js';

// Import adminAuth middleware to restrict access to admin-only actions
import adminAuth from '../middleware/adminAuth.js';

// Create a new router instance for product-related routes
const productRoutes = express.Router();


//  Route: Add Product
// ----------------------------------------------
// This route handles adding a new product.
// It expects 4 image fields: image1, image2, image3, image4
// Multer middleware `upload.fields()` is used to handle multiple named file uploads
// Example usage: POST /api/product/addproduct with form-data and images
productRoutes.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },  // Accept only 1 file for image1
    { name: "image2", maxCount: 1 },  // Accept only 1 file for image2
    { name: "image3", maxCount: 1 },  // Accept only 1 file for image3
    { name: "image4", maxCount: 1 }   // Accept only 1 file for image4
  ]),
  addProduct // Controller function to process the request
);


//Route: List all products
// ----------------------------------------------
// Public route to fetch the full list of products from the database
// Example usage: GET /api/product/list
productRoutes.get("/list", listProduct);


// Route: Remove a product (admin only)
// ----------------------------------------------
// This route deletes a specific product by its ID (passed as URL param)
// Protected by `adminAuth` middleware — only accessible by admin
// Example usage: POST /api/product/remove/:id
productRoutes.post("/remove/:id", adminAuth, removeProduct);


// Export the productRoutes to use in main app.js/server.js
export default productRoutes;
