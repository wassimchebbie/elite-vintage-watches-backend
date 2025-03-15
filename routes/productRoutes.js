const express = require('express');
const router = express.Router();
const initModels = require('../models');

let Product;
(async () => {
  const models = await initModels();
  Product = models.Product;
})();

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;