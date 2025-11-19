const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");
const { uploadSingle } = require("../controllers/uploadController");
const authenticate = require("../middleware/auth");
const adminOnly = require("../middleware/admin");
const validate = require("../middleware/validate");
const {
  idParam,
  createStaffSchema,
  updateStaffSchema,
} = require("../validations/schemas");

router.get("/", staffController.getAllStaff);
router.post(
  "/",
  authenticate,
  adminOnly,
  validate(createStaffSchema),
  uploadSingle,
  staffController.createStaff
);
router.put(
  "/:id",
  authenticate,
  adminOnly,
  validate(idParam, "params"),
  validate(updateStaffSchema),
  uploadSingle,
  staffController.updateStaff
);
router.delete(
  "/:id",
  authenticate,
  adminOnly,
  validate(idParam, "params"),
  staffController.deleteStaff
);

module.exports = router;
