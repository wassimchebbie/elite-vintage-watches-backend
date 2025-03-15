// backend/config/db.js
const { Sequelize } = require('sequelize');

const connectDB = async () => {
  const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/golden-time', {
    dialect: 'postgres',
    logging: false,
  });

  try {
    console.log('Attempting to connect to:', process.env.DATABASE_URL);
    await sequelize.authenticate();
    console.log('PostgreSQL connected');
    return sequelize;
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;