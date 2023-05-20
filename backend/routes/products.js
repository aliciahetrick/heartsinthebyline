// const express = require("express");

// const router = express.Router();

// const Stripe = require("stripe");
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// // Fetch all products from Stripe API
// router.get("/", async (req, res) => {
//   try {
//     const products = await stripe.products.list();
//     res.send(products);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

// // Fetch single product from Stripe API
// router.get("/:id", async (req, res, next) => {
//   try {
//     const product = await stripe.products.retrieve(req.params.id);
//     const priceOfProduct = product.default_price;

//     const price = await stripe.prices.retrieve(priceOfProduct);

//     product.price = price;

//     res.status(200).send(product);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

// router.post("/:id", async (req, res, next) => {
//   try {
//     const { metadata } = await stripe.products.retrieve(req.params.id);
//     const metadataStock = await metadata.stock;
//     const product = await stripe.products.update(req.params.id, {
//       metadata: {
//         stock: Number(metadataStock) - req.body.purchasedQuantity,
//       },
//     });
//     res.status(200).send(product);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

// module.exports = router;

const router = require('express').Router()
const {
  models: { Product },
} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    res.send(
      await Product.findAll())
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    res.send(await Product.findByPk(req.params.id))
  } catch (err) {
    console.log('There was a problem fetching the product.', err)
  }
})

router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.send(product)
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.send(await product.update(req.body))
  } catch (err) {
    console.log('There was a problem updating product.', err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.send(product)
  } catch (err) {
    console.log('Could not delete!', err)
  }
})

module.exports = router
