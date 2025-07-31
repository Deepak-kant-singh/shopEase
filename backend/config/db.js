// Importing the mongoose library to connect and interact with MongoDB
import mongoose from "mongoose";

// Declaring an asynchronous function to handle MongoDB connection
const connectDb = async () => {
    try {
        // Trying to connect to MongoDB using the connection string stored in the environment variable
        // `process.env.MONGODB_URL` should be defined in your .env file and contain your full MongoDB URI
        await mongoose.connect(process.env.MONGODB_URL);

        // If connection is successful, log this message in the console
        console.log("DB connected");
    } catch (error) {
        // If any error occurs while connecting, catch it and log an error message
        // Note: This does NOT show the actual error — just a generic message
        console.log("DB error");
    }
}

// Exporting the connectDb function so it can be imported and used in other parts of your app (like server.js)
export default connectDb;
