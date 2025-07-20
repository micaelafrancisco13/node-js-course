const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Creating a new user router...

router.post("/", async (req, res) => {
  // User input validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // We want to make sure that this user is not already
  // registered.
  // This returns a user object
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered.");

  // If the user is not yet registered, at this point,
  // "user" is null.
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();

  res.send(user);
});

module.exports = router;
