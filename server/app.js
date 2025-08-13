import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";
import sitemap from "./sitemap.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

// Import Routes
import authRouter from "./routes/authRouter.js";
import contactRouter from "./routes/contactRouter.js";
import userRouter from "./routes/userRouter.js";
import categoryRouter from "./routes/categoryRouter.js";

// Load Environment Variables
dotenv.config({ path: "./config.env" });

// Initialize Express App
const app = express();

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================
// 🔹 Security - Rate Limiting
// ==========================

// Global Rate Limit (100 requests per 15 minutes)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
}));

// Login Route Limit (5 attempts per 10 minutes)
app.use("/api/auth/login", rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later.",
}));

// ==========================
// 🔹 Database Connection
// ==========================
connectDB();

// ==========================
// 🔹 Middleware
// ==========================
app.use(express.json());
app.use(cors({
  origin: '*', // Allow all origins (or set specific domains)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Static Files for Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Sitemap Route
app.use("/sitemap.xml", (req, res) => sitemap.XMLtoWeb(res));

// ==========================
// 🔹 API Routes
// ==========================
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);
app.use("/api/admin", userRouter);
app.use("/api/categories", categoryRouter);

// ==========================
// 🔹 Error Handling Middleware
// ==========================
app.use(errorHandler);

// ==========================
// 🔹 Start Server
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
