// Import express framework for building the API server
import express from 'express'

// Import dotenv to load environment variables from .env file into process.env
import dotenv from 'dotenv'

// Import database connection function
import connectDb from './config/db.js'

// Import middleware to parse cookies from incoming requests
import cookieParser from 'cookie-parser'

// Import authentication-related routes
import authRoutes from './routes/authRoutes.js'

// Load environment variables
dotenv.config()

// Import CORS to handle Cross-Origin Resource Sharing
import cors from "cors"

// Import all route modules for user, product, cart, and order management
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// Set the port on which server will run. Use .env value if available; otherwise default to 6000
let port = process.env.PORT || 6000

// Initialize the Express application
let app = express()

// Middleware to parse JSON payloads from incoming requests
app.use(express.json())

// Middleware to parse cookies from incoming HTTP headers
app.use(cookieParser())

// Enable CORS for frontend origin (React app running on Vite dev server ports 5173/5174)
// `credentials:true` allows cookies to be sent with requests
app.use(cors({
 origin: ["https://shopease-frontend2.onrender.com", "hhttps://shopease-admin-7h0s.onrender.com"],
 credentials: true
}))

// Mount route modules to handle specific functionalities under specific base paths
app.use("/api/auth", authRoutes)        // Routes for registration, login, logout, etc.
app.use("/api/user", userRoutes)        // Routes for user-related data like profile
app.use("/api/product", productRoutes)  // Routes for adding, listing, and removing products
app.use("/api/cart", cartRoutes)        // Routes for cart actions like add/update/view
app.use("/api/order", orderRoutes)      // Routes for placing and managing orders

// Start the server on the specified port and connect to MongoDB after server is live
app.listen(port, () => {
    console.log("Hello From Server")   // Log message when server starts
    connectDb()                        // Connect to MongoDB database
})
