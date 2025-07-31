// Importing the jsonwebtoken library to generate and verify JWT tokens
import jwt from "jsonwebtoken";

// This function generates a JWT token using the userId
export const genToken = async (userId) => {
   try {
      // jwt.sign() creates a new token by embedding the userId inside the payload
      // `process.env.JWT_SECRET` is your secret key to sign the token (must be defined in .env)
      // `expiresIn: "7d"` means the token will expire in 7 days
      let token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

      // The generated token is returned from the function
      return token;
   } catch (error) {
      // If any error occurs during token generation, log a generic error message
      console.log("token error");
   }
};

// This is a similar function but uses `email` instead of userId in the payload
export const genToken1 = async (email) => {
   try {
      // Signing the token with email payload and same expiration time of 7 days
      let token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      // Returning the token
      return token;
   } catch (error) {
      // Catching any error during token creation
      console.log("token error");
   }
};
