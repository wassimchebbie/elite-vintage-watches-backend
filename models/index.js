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

  const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
  });

  // Sync without dropping tables
  await sequelize.sync();

  // Seed data only if tables are empty
  const productCount = await Product.count();
  if (productCount === 0) {
    await Product.bulkCreate([
      { name: 'Vintage Gold Watch', price: 100.00, description: 'A classic gold watch', image: 'gold-watch.jpg' },
      { name: 'Silver Chronograph', price: 150.00, description: 'A sleek silver watch', image: 'silver-watch.jpg' },
    ]);
    console.log('Sample products seeded');
  }

  const orderCount = await Order.count();
  if (orderCount === 0) {
    await Order.bulkCreate([
      { userId: 1, total: 100.00 },
      { userId: 2, total: 150.00 },
    ]);
    console.log('Sample orders seeded');
  }

  return { Product, Order };
};

module.exports = initModels;