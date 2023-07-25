const db = require("./db");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

// Associations go here
// TODO: create an order upon payment and associate with user

module.exports = {
  db,
  models: {
    Product,
    User,
    Order,
  },
};
