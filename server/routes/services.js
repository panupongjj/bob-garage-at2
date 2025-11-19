const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const { uploadSingle } = require("../controllers/uploadController");
const authenticate = require("../middleware/auth");
const adminOnly = require("../middleware/admin");
const validate = require("../middleware/validate");
const {
  idParam,
  createServiceSchema,
  updateServiceSchema,
} = require("../validations/schemas");

router.get("/", serviceController.getAllServices);
router.post(
  "/",
  authenticate,
  adminOnly,
  uploadSingle, // Move this BEFORE validate
  validate(createServiceSchema),
  serviceController.createService
);
router.put(
  "/:id",
  authenticate,
  adminOnly,
  validate(idParam, "params"),
  uploadSingle, // Move this BEFORE validate
  validate(updateServiceSchema),
  serviceController.updateService
);
router.delete(
  "/:id",
  authenticate,
  adminOnly,
  validate(idParam, "params"),
  serviceController.deleteService
);

module.exports = router;
