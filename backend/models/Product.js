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
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image_url: {
      type: Sequelize.STRING,
      defaultValue: "no-product.jpg",
    },
    stock: {
      type: Sequelize.INTEGER,
    },
    //   type: {
    //     type: Sequelize.ENUM("bakery", "produce", "dairy", "specialty"),
    //     allowNull: false,
    //   },
    //   description: {
    //     type: Sequelize.TEXT,
    //   },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Product;
