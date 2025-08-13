import contactModel from "../models/contactModel.js";

export const contactFormController = async (req, res) => {
  try {
    const { name, email, number, message } = req.body;

    // Validation

    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is Required" });
      case !email:
        return res.status(400).send({ error: "Email is Required" });
      case !number:
        return res.status(400).send({ error: "Number is Required" });
      case !message:
        return res.status(400).send({ error: "Message is Required" });
    }

    const contact = new contactModel({ ...req.body });
    await contact.save();
    res.status(201).send({
      success: true,
      message: "Message Send Successfully",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Sending Message",
    });
  }
};

// Fetch all contact inquiries
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find(); // Fetch all contacts
    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};

// Delete a contact inquiry
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactModel.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete contact",
      error: error.message,
    });
  }
};
