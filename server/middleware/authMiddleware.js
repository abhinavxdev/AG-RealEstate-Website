import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log("Authorization Header Received:", authHeader);

    // Check if header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        message: "Authorization header is missing or malformed",
      });
    }

    // Extract the token correctly (after "Bearer ")
    const token = authHeader.replace("Bearer ", "").trim();
    // console.log("Extracted Token:", token);

    // Verify JWT
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user to request
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).send({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    // console.log("Admin Check - User Found:", user);

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.error("Error in Admin Middleware:", error.message);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Admin Middleware",
    });
  }
};
