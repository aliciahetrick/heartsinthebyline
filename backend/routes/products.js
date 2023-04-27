const express = require("express");
const { isAdmin } = require("../middleware/auth");
const Product = require("../models/product");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

// Fetch all products in MongoDB
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Fetch single product in MongoDB
router.get("/:_id", async (req, res, next) => {
  try {
    // console.log("requesrrrt", req.params._id);
    const product = await Product.findOne({ url: req.params._id });
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Create a product
// router.post("/", async (req, res) => {
router.post("/", isAdmin, async (req, res) => {
  const { name, type, desc, price, image, url, stock } = req.body;

  try {
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "hearts",
      });

      if (uploadResponse) {
        const product = new Product({
          name,
          type,
          url,
          desc,
          price,
          stock,
          image: uploadResponse,
        });

        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
      }
    }
  } catch (err) {
    console.log("backend error", err);
    res.status(500).send(err);
  }
});

module.exports = router;
