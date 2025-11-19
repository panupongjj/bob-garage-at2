const { Staff } = require("../models");
const { uploadToCloudinary } = require("./uploadController");

const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll({
      order: [["id", "DESC"]],
    });
    res.json(staff);
  } catch (error) {
    console.error("Get staff error:", error);
    res.status(500).json({ error: "Failed to fetch staff" });
  }
};

const createStaff = async (req, res) => {
  try {
    const { name, role, bio } = req.body;
    let imageUrl = null;

    // Upload image to Cloudinary if provided
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file.buffer);
      } catch (error) {
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    const staff = await Staff.create({
      name,
      role,
      bio,
      imageUrl,
    });

    res.status(201).json(staff);
  } catch (error) {
    console.error("Create staff error:", error);
    res.status(500).json({ error: "Failed to create staff member" });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, bio } = req.body;

    const staff = await Staff.findByPk(id);
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }

    let imageUrl = staff.imageUrl;

    // Check if image changed (new file uploaded)
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file.buffer);
      } catch (error) {
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    await staff.update({
      name: name || staff.name,
      role: role || staff.role,
      bio: bio || staff.bio,
      imageUrl,
    });

    res.json(staff);
  } catch (error) {
    console.error("Update staff error:", error);
    res.status(500).json({ error: "Failed to update staff member" });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findByPk(id);
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }

    await staff.destroy();
    res.json({ message: "Staff member deleted successfully" });
  } catch (error) {
    console.error("Delete staff error:", error);
    res.status(500).json({ error: "Failed to delete staff member" });
  }
};

module.exports = {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
};
