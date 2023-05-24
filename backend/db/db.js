const Sequelize = require('sequelize')
require("dotenv").config();

const databaseName = process.env.POSTGRES_DB_NAME

const config = {
  logging: false
};

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config
)

module.exports = db