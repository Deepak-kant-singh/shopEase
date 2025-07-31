import express from "express" // Importing Express framework to use Router for route handling
import { 
  adminLogin,     // Controller function for handling admin login
  googleLogin,    // Controller function for Google-based login
  login,          // Controller function for user login
  logOut,         // Controller function for logging out a user
  registration    // Controller function for new user registration
} from "../controller/authController.js" // Importing all required authentication controllers

const authRoutes = express.Router() // Creating a new router instance to define routes related to authentication

// Route for user registration (POST request to /api/auth/registration)
authRoutes.post("/registration", registration) 

// Route for user login (POST request to /api/auth/login)
authRoutes.post("/login", login) 

// Route for user logout (GET request to /api/auth/logout)
authRoutes.get("/logout", logOut) 

// Route for Google Sign-In or Sign-Up (POST request to /api/auth/googlelogin)
authRoutes.post("/googlelogin", googleLogin) 

// Route for admin login using fixed credentials (POST request to /api/auth/adminlogin)
authRoutes.post("/adminlogin", adminLogin) 

export default authRoutes // Exporting the router to be used in the main app or route entry point
