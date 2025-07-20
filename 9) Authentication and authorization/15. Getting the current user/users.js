const authorization = require("../middleware/authorization");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

// Getting the current user...
// This API endpoint should only be available to
// authenticated users.
// Authentication is about validating the username and
// password.
// In authorization, we want to see if the user has
// permission to access a resource or not.
router.get("/me", authorization, async (req, res) => {
  // With this middleware, if the client doesn't send a
  // valid JSON web token, we will never get to this route
  // handler. However, if we get here, here we'll have
  // the "req.user" object.
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// creating a new user
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

  const token = user.generateAuthToken();
  const userClient = _.pick(user, ["_id", "name", "email"]);
  res.header("x-auth-token", token).send(userClient);
});

module.exports = router;
