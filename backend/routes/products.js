const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.send(await Product.findByPk(req.params.id));
  } catch (err) {
    console.log("There was a problem fetching the product.", err);
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (req.body.type === "pin") {
      const updatedProduct = await product.update({
        [`stock${req.body.cartGrade}`]:
          product[`stock${req.body.cartGrade}`] - req.body.purchasedQuantity,
      });
      res.send(await updatedProduct.save());
    } else {
      const updatedProduct = await product.update({
        stock: product.stock - req.body.purchasedQuantity,
      });
      res.send(await updatedProduct.save());
    }
  } catch (err) {
    console.log("There was a problem updating product.", err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (err) {
    console.log("Could not delete!", err);
  }
});

module.exports = router;
