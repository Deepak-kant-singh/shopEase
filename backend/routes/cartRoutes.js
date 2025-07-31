import express from 'express' // Importing Express framework to use Router

// Middleware to check if the user is authenticated before accessing cart routes
import isAuth from '../middleware/isAuth.js'

// Importing controller functions that handle cart-related operations
import { addToCart, getUserCart, UpdateCart } from '../controller/cartController.js'

// Creating a new instance of an Express Router for cart-related routes
const cartRoutes = express.Router()

// Route to get the current user's cart data
// POST request to /api/cart/get
// Uses `isAuth` middleware to ensure the request is from a logged-in user
cartRoutes.post('/get', isAuth, getUserCart)

// Route to add an item to the user's cart
// POST request to /api/cart/add
// Requires authentication via `isAuth`
cartRoutes.post('/add', isAuth, addToCart)

// Route to update quantity/size of a product in the cart
// POST request to /api/cart/update
// Also protected by `isAuth` middleware
cartRoutes.post('/update', isAuth, UpdateCart)

// Exporting the router so it can be mounted in the main server/app
export default cartRoutes
