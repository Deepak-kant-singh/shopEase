// Import jsonwebtoken to handle JWT operations like verifying tokens
import jwt from 'jsonwebtoken'

// Middleware to authenticate regular (non-admin) users
const isAuth = async (req, res, next) => {
  try {
    // Extract the JWT token from the incoming request's cookies
    let { token } = req.cookies;

    // If the token is not found, the user is not authenticated
    if (!token) {
      return res.status(400).json({ message: "user does not have token" });
    }

    // Verify the token using the JWT secret from environment variables
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    // If verification fails (invalid or tampered token), deny access
    if (!verifyToken) {
      return res.status(400).json({ message: "user does not have a valid token" });
    }

    // If token is valid, extract the userId from the token payload
    // and attach it to the request object for future use (e.g., in controllers)
    req.userId = verifyToken.userId;

    // Move forward to the next middleware or route handler
    next();

  } catch (error) {
    // If any error occurs during the process (token malformed, expired, etc.)
    console.log("isAuth error");
    return res.status(500).json({ message: `isAuth error ${error}` });
  }
}

// Export the middleware to use it in protected user routes
export default isAuth;
