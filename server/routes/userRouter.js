import express from "express";
import { getAllUsers, deleteUser } from "../controller/userController.js";

const router = express.Router();

// Fetch all users
router.get("/users", getAllUsers);

// Delete a user
router.delete("/users/:id", deleteUser);

export default router;
