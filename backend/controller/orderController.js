// Importing Order and User models from MongoDB
import Order from "../model/orderModel.js";
import User from "../model/userModel.js";

// Load environment variables (if needed)
import dotenv from 'dotenv'
dotenv.config()

// ========================== USER CONTROLLER ==========================

// Controller to handle placing an order
export const placeOrder = async (req, res) => {
    try {
        // Extract order details from the request body
        const { items, amount, address } = req.body;
        // Get the user ID from authenticated request (assumed set via middleware)
        const userId = req.userId;

        // Prepare order data to be saved
        const orderData = {
            items,                // Cart items (with size, qty, etc.)
            amount,               // Total amount (product total + delivery)
            userId,               // Reference to the user placing the order
            address,              // Delivery address
            paymentMethod: 'COD', // Default payment method is Cash on Delivery
            payment: false,       // Payment not completed online
            date: Date.now()      // Timestamp of order
        }

        // Create and save the new order in the database
        const newOrder = new Order(orderData)
        await newOrder.save()

        // Clear user's cart after placing the order
        await User.findByIdAndUpdate(userId, { cartData: {} })

        // Return a success response
        return res.status(201).json({ message: 'Order Place' })
    } catch (error) {
        console.log(error)
        // Catch any error and return a server error response
        res.status(500).json({ message: 'Order Place error' })
    }
}

// Controller to fetch all orders placed by a specific user
export const userOrders = async (req, res) => {
    try {
        // Get userId from middleware
        const userId = req.userId;
        // Fetch all orders from the database that belong to this user
        const orders = await Order.find({ userId })
        // Return user's order list
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "userOrders error" })
    }
}


// ========================== ADMIN CONTROLLER ==========================

// Controller to fetch all orders in the system (admin view)
export const allOrders = async (req, res) => {
    try {
        // Fetch all orders from DB
        const orders = await Order.find({})
        // Send orders as response
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "adminAllOrders error" })
    }
}

// Controller to update the status of a particular order (admin)
export const updateStatus = async (req, res) => {
    try {
        // Extract orderId and new status from the request body
        const { orderId, status } = req.body

        // Update order status in DB
        await Order.findByIdAndUpdate(orderId, { status })

        // Return success response
        return res.status(201).json({ message: 'Status Updated' })
    } catch (error) {
        // Handle any error and return proper message
        return res.status(500).json({ message: error.message })
    }
}
