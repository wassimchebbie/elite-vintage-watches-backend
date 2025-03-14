const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number, // Your custom id field
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
});

module.exports = mongoose.model('Product', productSchema);