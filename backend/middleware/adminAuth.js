// Import jsonwebtoken for verifying the admin JWT token
import jwt from 'jsonwebtoken'

// Middleware function to protect admin routes
const adminAuth = async (req, res, next) => {
  try {
    // Destructure token from cookies sent in the request
    let { token } = req.cookies;

    // If no token is present, deny access
    if (!token) {
      return res.status(400).json({ message: "Not Authorized Login Again" });
    }

    // Verify the token using the JWT secret key stored in .env
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    // If token verification fails, deny access
    if (!verifyToken) {
      return res.status(400).json({ message: "Not Authorized Login Again, Invalid token" });
    }

    // If token is valid, manually attach the admin email to the request
    // (assuming only 1 static admin, whose email is stored in .env)
    req.adminEmail = process.env.ADMIN_EMAIL;

    // Call next() to pass control to the next middleware or route handler
    next();
  } catch (error) {
    // If any error occurs during token validation, log it and send 500
    console.log("adminAuth error");
    return res.status(500).json({ message: `adminAuth error ${error}` });
  }
};

// Export the middleware for use in protected admin routes
export default adminAuth;
