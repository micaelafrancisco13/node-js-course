const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
// the validate() from User is for registering a new user
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  // If the user is not yet registered
  if (!user) return res.status(400).send("Invalid email or password.");

  // Validating the password...
  // The plain-text password from the client is compared to
  // the hashed password from the database.
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  // When we call the compare(), bcrypt is going to get
  // that salt and use that to rehash the plain text
  // password. If they are equal, then line 21 will return
  // true.

  res.send("Successfully logged in!");
});

// for validating a user that wants to log-in
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(2).max(255).email().required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
