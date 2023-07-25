const Sequelize = require("sequelize");
const db = require("../db/db");

const Order = db.define(
  "order",
  {
    userId: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    customerId: {
      type: Sequelize.STRING,
    },
    payment_intent_id: {
      type: Sequelize.STRING,
    },
    products: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      defaultValue: [],
    },
    subtotal: {
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    total: {
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    shipping_address: {
      type: Sequelize.JSON,
    },
    delivery_status: {
      type: Sequelize.STRING,
      defaultValue: "pending",
    },
    payment_status: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

module.exports = Order;
