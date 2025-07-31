// Importing express to use the Router functionality
import express from 'express'

// Middleware to authenticate users (only logged-in users can place/view orders)
import isAuth from '../middleware/isAuth.js'

// Importing order controller functions
import { allOrders, placeOrder, updateStatus, userOrders } from '../controller/orderController.js'

// Middleware to authenticate admin users (only admin can view/update all orders)
import adminAuth from '../middleware/adminAuth.js'

// Creating a new router for handling order-related routes
const orderRoutes = express.Router()

// ------------------- USER ROUTES ------------------- //

// Route for placing a new order by a user
// Endpoint: POST /api/order/placeorder
// Protected by isAuth middleware to ensure user is logged in
orderRoutes.post("/placeorder", isAuth, placeOrder)

// Route for fetching all orders placed by the logged-in user
// Endpoint: POST /api/order/userorder
// Protected by isAuth middleware
orderRoutes.post("/userorder", isAuth, userOrders)


// ------------------- ADMIN ROUTES ------------------- //

// Route for admin to fetch all orders in the system
// Endpoint: POST /api/order/list
// Protected by adminAuth middleware to ensure only admin can access it
orderRoutes.post("/list", adminAuth, allOrders)

// Route for admin to update the status of any order (e.g., shipped, delivered)
// Endpoint: POST /api/order/status
// Also protected by adminAuth
orderRoutes.post("/status", adminAuth, updateStatus)


// Exporting the router so it can be used in the main app
export default orderRoutes
