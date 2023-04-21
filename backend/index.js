const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

const products = require("./products");

const app = express();

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
