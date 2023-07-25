const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const genAuthToken = require("../utils/genAuthToken");
const {
  models: { User },
} = require("../db");

router.post("/", async (req, res) => {
  const model = Joi.object({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required().min(3).max(75),
    password: Joi.string().required().min(3).max(200),
  });

  const { error } = model.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ where: { email: req.body.email } });

  if (user) {
    return res.status(400).send("User already exists");
  }

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  });

  user = await user.save();

  const token = genAuthToken(user);

  res.send(token);
});

module.exports = router;
