const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const genAuthToken = require("../utils/genAuthToken");

const {
  models: { User },
} = require("../db");

router.post("/", async (req, res) => {
  try {
    const model = Joi.object({
      email: Joi.string().email().required().min(3).max(75),
      password: Joi.string().required().min(3).max(200),
    });

    const { error } = model.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(400).send("Invalid email or password");
    }

    const token = genAuthToken(user);
    res.send(token);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
