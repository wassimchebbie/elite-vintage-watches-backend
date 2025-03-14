// seed.js
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Gold Heritage',
    description: 'A masterpiece from the 1940s',
    price: 0, // Set to 0 to display "Inquire" as in your HTML
    image: '/images/watch1.jpg', // Matches your HTML; assumes images are in public/
    category: 'gold',
  },
  {
    name: 'Silver Chronograph',
    description: 'Precision engineering from the 1970s',
    price: 0,
    image: '/images/watch2.jpg',
    category: 'silver',
  },
  {
    name: 'Black Diamond',
    description: 'Luxury redefined from the 1950s',
    price: 0,
    image: '/images/watch3.jpg',
    category: 'other',
  },
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('MongoDB connected');
    await Product.deleteMany({}); // Clear existing products
    await Product.insertMany(products); // Insert new products
    console.log('Products seeded successfully');
    process.exit(0); // Exit with success
  })
  .catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1); // Exit with failure
  });