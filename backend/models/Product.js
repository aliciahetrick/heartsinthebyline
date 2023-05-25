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
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

module.exports = Product;
