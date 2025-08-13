import express from "express";
import { contactFormController, getAllContacts, deleteContact } from "../controller/contactController.js";

const router = express.Router();

router.post("/contact-us", contactFormController);

// Fetch all contacts
router.get("/all", getAllContacts);

// Delete a contact by ID
router.delete("/:id", deleteContact);

export default router;
