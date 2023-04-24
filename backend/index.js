const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const products = require("./products");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.send(products);
});

app.get("/products", (req, res) => {
  res.send(products);
});

app.get(`/products/:id`, (req, res) => {
  console.log(req.params);
  // console.log(products.find((product) => product.name === req.params.id));
  res.send(products.find((product) => product.name === req.params.id));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log("MongoDB connection failed", err.message));
