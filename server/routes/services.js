const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const { uploadSingle } = require("../controllers/uploadController");
const authenticate = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

router.get("/", serviceController.getAllServices);
router.post(
  "/",
  authenticate,
  adminOnly,
  uploadSingle,
  serviceController.createService
);
router.put(
  "/:id",
  authenticate,
  adminOnly,
  uploadSingle,
  serviceController.updateService
);
router.delete("/:id", authenticate, adminOnly, serviceController.deleteService);

module.exports = router;
