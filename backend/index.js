// Import express framework for building the API server
import express from 'express'

// Import dotenv to load environment variables from .env file into process.env
import dotenv from 'dotenv'

// Import database connection function
import connectDb from './config/db.js'

// Import middleware to parse cookies from incoming requests
import cookieParser from 'cookie-parser'

// Import CORS to handle Cross-Origin Resource Sharing
import cors from "cors"

// Import route modules
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// Load environment variables
dotenv.config()

// Set the port on which server will run. Use .env value if available; otherwise default to 6000
const port = process.env.PORT || 6000

// Initialize the Express application
const app = express()

// Middleware to parse JSON payloads from incoming requests
app.use(express.json())

// Middleware to parse cookies from incoming HTTP headers
app.use(cookieParser())

// ✅ CORS Configuration
const allowedOrigins = [
    "https://shopease-frontend2.onrender.com",  // Customer frontend
    "https://shopease-admin-7h0s.onrender.com", // Admin dashboard
    "http://localhost:5173"                     // Local development
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true, // Allow cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// ✅ Handle Preflight OPTIONS requests globally
app.options("*", cors())

// ✅ Debug route to test CORS (Optional)
app.get("/test-cors", (req, res) => {
    res.set("Access-Control-Allow-Origin", "https://shopease-admin-7h0s.onrender.com");
    res.json({ message: "CORS is working correctly!" });
});

// Mount route modules
app.use("/api/auth", authRoutes)        // Routes for registration, login, logout, etc.
app.use("/api/user", userRoutes)        // Routes for user-related data like profile
app.use("/api/product", productRoutes)  // Routes for adding, listing, and removing products
app.use("/api/cart", cartRoutes)        // Routes for cart actions like add/update/view
app.use("/api/order", orderRoutes)      // Routes for placing and managing orders

// Start the server and connect to MongoDB
app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`)
    connectDb()
})
