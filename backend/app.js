const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const productsRoute = require("./routes/products");
const register = require("./routes/register");
const login = require("./routes/login");
const stripe = require("./routes/stripe");

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

app.use(cors());

// auth and api routes
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);
app.use("/api/products", productsRoute);

app.get("/", (req, res) => {
  res.send("root");
});

module.exports = app;
