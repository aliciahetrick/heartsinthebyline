const express = require("express");

const router = express.Router();

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Fetch all products from Stripe API
router.get("/", async (req, res) => {
  try {
    const products = await stripe.products.list({
      limit: 3,
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Fetch single product from Stripe API
router.get("/:id", async (req, res, next) => {
  try {
    const product = await stripe.products.retrieve(req.params.id);
    const priceOfProduct = product.default_price;

    const price = await stripe.prices.retrieve(priceOfProduct);

    product.price = price;

    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const { metadata } = await stripe.products.retrieve(req.params.id);
    const metadataStock = await metadata.stock;
    const product = await stripe.products.update(req.params.id, {
      metadata: {
        stock: Number(metadataStock) - req.body.purchasedQuantity,
      },
    });
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
