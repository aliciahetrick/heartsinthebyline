const Sequelize = require("sequelize");
const db = require("../db/db");

const User = db.define(
  "user",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        min: 3,
        max: 30,
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 3,
        max: 75,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        min: 3,
        max: 1024,
      },
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true }
);

module.exports = User;
