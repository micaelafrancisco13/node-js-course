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

  // Line 26 returns
  // {
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // }
  const userReq = _.pick(req.body, ["name", "email", "password"]);
  user = new User(userReq);

  await user.save();

  // We want to exclude the password and the version
  // properties. Install Lodash
  // The code below returns a new object with only those
  // properties indicated.
  // _.pick(obj, [property1, property2]);
  const userClient = _.pick(user, ["_id", "name", "email"]);
  res.send(userClient);
});

module.exports = router;
