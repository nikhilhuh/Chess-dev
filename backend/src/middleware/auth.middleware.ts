import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Define the structure of the decoded token
interface DecodedToken {
  id: string;
  [key: string]: any; // Allow additional properties
}

// Extend the Request type to include the `user` property
interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  // Check if the authorization header is missing
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing." });
  }

  // Extract the token from the authorization header
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader.trim();

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: "Access denied. Token is missing." });
  }

  try {
    // Verify the token and decode it
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in the environment variables.");
    }

    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;
    req.user = decoded; // Attach the decoded token to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

export default authenticate;