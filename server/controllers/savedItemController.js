const { SavedItem, Service } = require('../models');

const getSavedItems = async (req, res) => {
  try {
    const savedItems = await SavedItem.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Service,
        as: 'service',
        attributes: ['id', 'name', 'description', 'price', 'imageUrl']
      }],
      order: [['id', 'DESC']]
    });
    res.json(savedItems);
  } catch (error) {
    console.error('Get saved items error:', error);
    res.status(500).json({ error: 'Failed to fetch saved items' });
  }
};

const createSavedItem = async (req, res) => {
  try {
    const { serviceId } = req.body;

    // Check if service exists
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Check if already saved
    const existing = await SavedItem.findOne({
      where: { userId: req.user.id, serviceId }
    });

    if (existing) {
      return res.status(400).json({ error: 'Service already saved' });
    }

    const savedItem = await SavedItem.create({
      userId: req.user.id,
      serviceId
    });

    const savedItemWithService = await SavedItem.findByPk(savedItem.id, {
      include: [{
        model: Service,
        as: 'service',
        attributes: ['id', 'name', 'description', 'price', 'imageUrl']
      }]
    });

    res.status(201).json(savedItemWithService);
  } catch (error) {
    console.error('Create saved item error:', error);
    res.status(500).json({ error: 'Failed to save item' });
  }
};

const deleteSavedItem = async (req, res) => {
  try {
    const { id } = req.params;

    const savedItem = await SavedItem.findOne({
      where: { id, userId: req.user.id }
    });

    if (!savedItem) {
      return res.status(404).json({ error: 'Saved item not found' });
    }

    await savedItem.destroy();
    res.json({ message: 'Saved item removed successfully' });
  } catch (error) {
    console.error('Delete saved item error:', error);
    res.status(500).json({ error: 'Failed to remove saved item' });
  }
};

module.exports = {
  getSavedItems,
  createSavedItem,
  deleteSavedItem
};

