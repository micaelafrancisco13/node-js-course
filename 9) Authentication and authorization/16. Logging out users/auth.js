const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

// What about logging out users?
// Because we are not storing this token anywhere on the
// server, we don't need a separate route handler to delete
// this token.

// Technically, you need to implement the logging out
// feature on the client, not on the server. So on the
// client application, when the user wants to log out, you
// simply delete a token from the client.

// As a security best practice, whenever you're sending the 
// token from the client to the server ,make sure to use 
// HTTPS.

// for logging in users...
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send(`Successfully logged in! ${token}`);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(2).max(255).email().required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
