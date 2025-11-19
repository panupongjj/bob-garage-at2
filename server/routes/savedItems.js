const express = require('express');
const router = express.Router();
const savedItemController = require('../controllers/savedItemController');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, savedItemController.getSavedItems);
router.post('/', authenticate, savedItemController.createSavedItem);
router.delete('/:id', authenticate, savedItemController.deleteSavedItem);

module.exports = router;

