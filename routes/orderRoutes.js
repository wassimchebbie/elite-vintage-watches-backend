const express = require('express');
const router = express.Router();
const { createOrder, getOrders, removeOrderItem, checkoutOrder } = require('../controllers/orderController');

router.post('/', createOrder);           // Add item to cart
router.get('/', getOrders);              // Fetch cart
router.delete('/:orderId/items/:itemId', removeOrderItem); // Remove item
router.post('/checkout', checkoutOrder); // Checkout

module.exports = router;