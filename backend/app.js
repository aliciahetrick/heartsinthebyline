const express = require("express");
const morgan = require("morgan");
const app = express();

const productsRoute = require("./routes/products");
const register = require("./routes/register");
const login = require("./routes/login");

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use("/api/register", register);
app.use("/api/login", login);
// app.use("/api/stripe", stripe);
app.use("/api/products", productsRoute);

app.get("/", (req, res) => {
  res.send("root");
});

module.exports = app;
