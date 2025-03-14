const Order = require('../models/Order');
const Product = require('../models/Product'); // Import Product model for validation
const jwt = require('jsonwebtoken');

const createOrder = async (req, res) => {
  const { productId, quantity } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const order = await Order.create({ userId: decoded.id, productId, quantity });
    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

const getOrders = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const orders = await Order.find({ userId: decoded.id }).populate('productId');
    const cart = {
      _id: decoded.id, // User ID as cart ID
      items: orders.map(order => ({
        _id: order._id,
        name: order.productId.name,
        price: order.productId.price,
        image: order.productId.image,
        quantity: order.quantity,
      })),
    };
    res.json(cart);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

const removeOrderItem = async (req, res) => {
  const { orderId, itemId } = req.params; // Keep itemId for compatibility
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const order = await Order.findOneAndDelete({ _id: itemId, userId: decoded.id });
    if (!order) return res.status(404).json({ message: 'Order item not found' });
    res.json({ message: 'Item removed' });
  } catch (error) {
    console.error('Remove order item error:', error);
    res.status(500).json({ message: 'Error removing item', error: error.message });
  }
};

const checkoutOrder = async (req, res) => {
  const { items, total } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await Order.deleteMany({ userId: decoded.id });
    res.json({ message: 'Checkout successful', orderId: decoded.id });
  } catch (error) {
    console.error('Checkout order error:', error);
    res.status(500).json({ message: 'Error during checkout', error: error.message });
  }
};

module.exports = { createOrder, getOrders, removeOrderItem, checkoutOrder };