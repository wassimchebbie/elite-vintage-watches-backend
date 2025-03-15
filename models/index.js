const { DataTypes } = require('sequelize');
const connectDB = require('../config/db');

const initModels = async () => {
  const sequelize = await connectDB();

  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
  });

  // Seed sample data
  await sequelize.sync({ force: true }); // Resets table (use cautiously)
  await Product.bulkCreate([
    { name: 'Vintage Gold Watch', price: 100.00, description: 'A classic gold watch', image: 'gold-watch.jpg' },
    { name: 'Silver Chronograph', price: 150.00, description: 'A sleek silver watch', image: 'silver-watch.jpg' },
  ]);
  console.log('Sample data seeded');

  return { Product };
};

module.exports = initModels;