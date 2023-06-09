const Sequelize = require("sequelize");
const db = require("../db/db");

const Product = db.define(
  "product",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    subtitle: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    stock: {
      type: Sequelize.INTEGER,
    },
    priceA: {
      type: Sequelize.INTEGER,
    },
    priceB: {
      type: Sequelize.INTEGER,
    },
    priceC: {
      type: Sequelize.INTEGER,
    },
    stockA: {
      type: Sequelize.INTEGER,
    },
    stockB: {
      type: Sequelize.INTEGER,
    },
    stockC: {
      type: Sequelize.INTEGER,
    },
    image_url: {
      type: Sequelize.STRING,
      defaultValue: "no-product.jpg",
    },
    type: {
      type: Sequelize.ENUM("pin", "sticker"),
      allowNull: false,
    },
    tarot: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
  },
  { timestamps: false }
);

module.exports = Product;
