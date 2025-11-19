const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");
const { uploadSingle } = require("../controllers/uploadController");
const authenticate = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

router.get("/", staffController.getAllStaff);
router.post(
  "/",
  authenticate,
  adminOnly,
  uploadSingle,
  staffController.createStaff
);
router.put(
  "/:id",
  authenticate,
  adminOnly,
  uploadSingle,
  staffController.updateStaff
);
router.delete("/:id", authenticate, adminOnly, staffController.deleteStaff);

module.exports = router;
