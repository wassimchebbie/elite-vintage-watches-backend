const express = require('express');
const router = express.Router();
const initModels = require('../models');

let Order;
(async () => {
  const models = await initModels();
  Order = models.Order;
})();

router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;