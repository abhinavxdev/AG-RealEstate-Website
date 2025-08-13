import Property from "../models/propertyModel.js";

export const createProperty = async (req, res) => {
  try {
    const { ownerName, phone, email, propertyType, location, price, description } = req.body;
    const images = req.files.map((file) => file.path);

    const newProperty = new Property({
      ownerName,
      phone,
      email,
      propertyType,
      location,
      price,
      description,
      images,
    });

    await newProperty.save();
    res.status(201).json({ success: true, message: "Property submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error submitting property" });
  }
};

// Get all properties
export const getProperties = async (req, res) => {
    try {
      const properties = await Property.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, properties });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch properties" });
    }
  };
  
  // Delete a property
  export const deleteProperty = async (req, res) => {
    try {
      const { id } = req.params;
      await Property.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Property deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to delete property" });
    }
  };