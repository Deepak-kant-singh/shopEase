// Importing the User model to interact with the MongoDB 'users' collection
import User from "../model/userModel.js";


// ========================= ADD TO CART CONTROLLER ==========================
export const addToCart = async (req, res) => {
  try {
    // Extracting the item ID and size from the request body
    const { itemId, size } = req.body;

    // Find the currently logged-in user using the userId (set via middleware)
    const userData = await User.findById(req.userId);

    // If no user is found, return 404
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize cartData if it doesn't exist on user
    let cartData = userData.cartData || {};

    // If item already exists in cart
    if (cartData[itemId]) {
      // If size exists, increment its quantity
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        // If size doesn’t exist, initialize quantity to 1
        cartData[itemId][size] = 1;
      }
    } else {
      // If item doesn't exist in cart, create item object and set quantity for selected size
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // Update user's cart in the database
    await User.findByIdAndUpdate(req.userId, { cartData });

    // Respond with success
    return res.status(201).json({ message: "Added to cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "addToCart error" });
  }
};


// ========================= UPDATE CART CONTROLLER ==========================
export const UpdateCart = async (req, res) => {
  try {
    // Extract itemId, size, and new quantity from the request
    const { itemId, size, quantity } = req.body;

    // Find the user by ID
    const userData = await User.findById(req.userId);

    // Get existing cartData from user
    let cartData = await userData.cartData;

    // Update the specific item and size quantity
    cartData[itemId][size] = quantity;

    // Save updated cartData in the database
    await User.findByIdAndUpdate(req.userId, { cartData });

    // Respond with success
    return res.status(201).json({ message: "cart updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "updateCart error" });
  }
};


// ========================= GET USER CART CONTROLLER ==========================
export const getUserCart = async (req, res) => {
  try {
    // Find the logged-in user's data
    const userData = await User.findById(req.userId);

    // Get cartData from the user
    let cartData = await userData.cartData;

    // Send cartData back to frontend
    return res.status(200).json(cartData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "getUserCart error" });
  }
};
