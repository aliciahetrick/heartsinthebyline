const db = require("./db");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

// associations go here

module.exports = {
  db,
  models: {
    Product,
    User,
    Order,
  },
};
