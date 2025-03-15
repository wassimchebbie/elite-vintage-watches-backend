const { Sequelize, DataTypes } = require('sequelize');
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

  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    // Add other fields
  });

  const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    // Add other fields
  });

  await sequelize.sync(); // Creates tables
  return { Product, User, Order, sequelize };
};

module.exports = initModels();