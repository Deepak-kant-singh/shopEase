// Importing the User model to interact with the user collection in MongoDB
import User from "../model/userModel.js";

// Importing validator to validate inputs like email
import validator from "validator";

// Importing bcrypt to hash passwords and compare them securely
import bcrypt from "bcryptjs";

// Importing token generators for users and admin
import { genToken, genToken1 } from "../config/token.js";


// ================== USER REGISTRATION CONTROLLER ===================
export const registration = async (req, res) => {
  try {
    // Extracting name, email, and password from the request body
    const { name, email, password } = req.body;

    // Check if a user already exists with the same email
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    // Validate the format of the email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid Email" });
    }

    // Ensure password is strong enough (at least 8 characters)
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter Strong Password" });
    }

    // Hashing the password using bcrypt with salt rounds of 10
    let hashPassword = await bcrypt.hash(password, 10);

    // Creating the new user with hashed password
    const user = await User.create({ name, email, password: hashPassword });

    // Generate JWT token using user's MongoDB ID
    let token = await genToken(user._id);

    // Set token in cookie with 7-day expiry and HTTP-only flag
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production with HTTPS
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return success response with user object
    return res.status(201).json(user);
  } catch (error) {
    console.log("registration error");
    return res.status(500).json({ message: `registration error ${error}` });
  }
};



// ================== USER LOGIN CONTROLLER ===================
export const login = async (req, res) => {
  try {
    // Extract email and password from request body
    let { email, password } = req.body;

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User is not Found" });
    }

    // Compare hashed password with user input password
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate token using user ID
    let token = await genToken(user._id);

    // Set the token in HTTP-only cookie for 7 days
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send user info as success response
    return res.status(201).json(user);
  } catch (error) {
    console.log("login error");
    return res.status(500).json({ message: `Login error ${error}` });
  }
};



// ================== USER LOGOUT CONTROLLER ===================
export const logOut = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");

    // Return success response
    return res.status(200).json({ message: "logOut successful" });
  } catch (error) {
    console.log("logOut error");
    return res.status(500).json({ message: `LogOut error ${error}` });
  }
};



// ================== GOOGLE LOGIN CONTROLLER ===================
export const googleLogin = async (req, res) => {
  try {
    // Extract user info from request body (sent from frontend after Firebase Google auth)
    let { name, email } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });

    // If user does not exist, create one
    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }

    // Generate token for authenticated user
    let token = await genToken(user._id);

    // Set the token in cookie for 7 days
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return user object as response
    return res.status(200).json(user);
  } catch (error) {
    console.log("googleLogin error");
    return res.status(500).json({ message: `googleLogin error ${error}` });
  }
};



// ================== ADMIN LOGIN CONTROLLER ===================
export const adminLogin = async (req, res) => {
  try {
    // Destructure admin credentials from request body
    let { email, password } = req.body;

    // Check if the credentials match .env admin email and password
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

      // Generate token for admin using their email
      let token = await genToken1(email);

      // Set the token in cookie valid for 1 day
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      });

      // Return token as response
      return res.status(200).json(token);
    }

    // If credentials don't match, return 400 error
    return res.status(400).json({ message: "Invaild creadintials" });
  } catch (error) {
    console.log("AdminLogin error");
    return res.status(500).json({ message: `AdminLogin error ${error}` });
  }
};
