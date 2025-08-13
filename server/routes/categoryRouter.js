import express from "express";
import { createCategory, getAllCategories, deleteCategory } from "../controller/categoryController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Category
router.post("/create", requireSignIn, isAdmin, createCategory);

// Get All Categories
router.get("/", getAllCategories);

// Delete Category
router.delete("/:id", requireSignIn, isAdmin, deleteCategory);

export default router;
