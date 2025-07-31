// Importing required modules
import express from "express";

// Middleware to verify if the user is authenticated
import isAuth from "../middleware/isAuth.js";

// Controller functions to handle logic for fetching user and admin details
import { getAdmin, getCurrentUser } from "../controller/userController.js";

// Middleware to verify if the admin is authenticated
import adminAuth from "../middleware/adminAuth.js";

// Create a new Express Router instance to handle user-related routes
let userRoutes = express.Router();


// Route: Get Current Logged-in User
// ----------------------------------------------
// This route returns the data of the currently logged-in user.
// It uses the `isAuth` middleware to ensure the user is authenticated.
// The `getCurrentUser` controller fetches and returns the user's data.
// Route: GET /api/user/getcurrentuser
userRoutes.get("/getcurrentuser", isAuth, getCurrentUser);


//  Route: Get Admin Details
// ----------------------------------------------
// This route returns static admin data (email & role).
// It uses the `adminAuth` middleware to ensure only admin can access it.
// The `getAdmin` controller responds with admin info.
// Route: GET /api/user/getadmin
userRoutes.get("/getadmin", adminAuth, getAdmin);


// Export the router so it can be used in the main server file
export default userRoutes;
