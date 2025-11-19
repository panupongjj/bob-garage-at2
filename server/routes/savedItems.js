const express = require('express');
const router = express.Router();
const savedItemController = require('../controllers/savedItemController');
const authenticate = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  idParam,
  createSavedItemSchema,
} = require('../validations/schemas');

router.get('/', authenticate, savedItemController.getSavedItems);
router.post(
  '/',
  authenticate,
  validate(createSavedItemSchema),
  savedItemController.createSavedItem
);
router.delete(
  '/:id',
  authenticate,
  validate(idParam, 'params'),
  savedItemController.deleteSavedItem
);

module.exports = router;

