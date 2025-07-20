const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Let's imagine when the user registers, we want to assume
// they're logged in, so they don't have to log in
// separately.

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

  // When the user registers, we want to return the JSON
  // web token in an HTTP header.
  // Just like we have headers in our request, we also have
  // headers in our response object.

  // Before we send a response to the client, we generate
  // the token, and then we call res.header().
  // For any custom headers that we define in our app, we
  // should prefix these headers with "x-".
  // res.header(header_name, value);

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  const userClient = _.pick(user, ["_id", "name", "email"]);
  res.header("x-auth-token", token).send(userClient);
});

// So in our client app, when we register a user, we can
// read this header, we can store this JSON web token on
// the client, and next time we're going to make an API
// call, we'll send this to the server.

module.exports = router;
