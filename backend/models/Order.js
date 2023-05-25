// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },

//     customerId: {
//       type: String,
//     },

//     payment_intent_id: {
//       type: String,
//     },
//     products: [],
//     subtotal: { type: Number, required: true },
//     total: { type: Number, required: true },

//     shipping_address: {
//       type: Object,
//       required: true,
//     },
//     delivery_status: { type: String, default: "pending" },
//     payment_status: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const Order = mongoose.model("Order", orderSchema);

// module.exports = Order;

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
