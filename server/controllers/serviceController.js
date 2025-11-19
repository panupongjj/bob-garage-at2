const { Service } = require("../models");
const { uploadToCloudinary } = require("./uploadController");

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      order: [["id", "DESC"]],
    });
    res.json(services);
  } catch (error) {
    console.error("Get services error:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

const createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    let imageUrl = null;

    if (!name || !description || price === undefined) {
      return res
        .status(400)
        .json({ error: "Name, description, and price are required" });
    }

    // Upload image to Cloudinary if provided
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file.buffer);
      } catch (error) {
        console.error("Image upload error:", error);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    const service = await Service.create({
      name,
      description,
      price: parseFloat(price),
      imageUrl,
    });

    res.status(201).json(service);
  } catch (error) {
    console.error("Create service error:", error);
    res.status(500).json({ error: "Failed to create service" });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    let imageUrl = service.imageUrl;

    // Check if image changed (new file uploaded)
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file.buffer);
      } catch (error) {
        console.error("Image upload error:", error);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    await service.update({
      name: name || service.name,
      description: description || service.description,
      price: price !== undefined ? parseFloat(price) : service.price,
      imageUrl,
    });

    res.json(service);
  } catch (error) {
    console.error("Update service error:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    await service.destroy();
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Delete service error:", error);
    res.status(500).json({ error: "Failed to delete service" });
  }
};

module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService,
};
