const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: {
      type: String,
      required: true,
    },
    desc: { type: String, required: true },
    type: {
      type: String,
      enum: ["pin", "sticker"],
      required: true,
    },
    artist: {
      type: String,
      enum: ["taylor", "billie", "olivia"],
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: Object, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
