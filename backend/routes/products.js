const express = require("express");
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
    const product = await Product.findOne({ name: req.params._id });
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Create a product
router.post("/", async (req, res) => {
  const { name, desc, price, image } = req.body;

  try {
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "hearts",
      });

      if (uploadResponse) {
        const product = new Product({
          name,
          desc,
          price,
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
