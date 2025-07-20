const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered.");

  const userReq = _.pick(req.body, ["name", "email", "password"]);
  user = new User(userReq);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  // Let's encapsulate the code below
  // const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  const token = user.generateAuthToken();
  const userClient = _.pick(user, ["_id", "name", "email"]);
  res.header("x-auth-token", token).send(userClient);
});

module.exports = router;
