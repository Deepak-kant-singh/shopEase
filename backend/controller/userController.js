// Importing the User model to interact with the MongoDB user collection
import User from "../model/userModel.js";


// ==================== Get Current Logged-in User ====================

export const getCurrentUser = async (req, res) => {
  try {
    // Fetch user from database using the userId extracted from JWT middleware
    // `.select("-password")` excludes the password field from the returned object
    let user = await User.findById(req.userId).select("-password");

    // If no user found with given ID, send a 404 Not Found response
    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }

    // If user is found, send back user details (excluding password)
    return res.status(200).json(user);
  } catch (error) {
    // Catch any unexpected errors and respond with 500
    console.log(error);
    return res.status(500).json({ message: `getCurrentUser error ${error}` });
  }
};


// ==================== Get Admin Details (From Token) ====================

export const getAdmin = async (req, res) => {
  try {
    // adminEmail is assumed to be added to `req` by middleware (extracted from token)
    let adminEmail = req.adminEmail;

    // If admin email is not found in the request, return 404
    if (!adminEmail) {
      return res.status(404).json({ message: "Admin is not found" });
    }

    // If found, return admin email and role (can be expanded later)
    return res.status(201).json({
      email: adminEmail,
      role: "admin"
    });
  } catch (error) {
    // Log any internal server errors and respond with 500
    console.log(error);
    return res.status(500).json({ message: `getAdmin error ${error}` });
  }
};
