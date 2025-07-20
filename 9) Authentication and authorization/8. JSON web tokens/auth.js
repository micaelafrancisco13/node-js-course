const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  // We need to return a JSON Web token.
  // A JSON Web token is basically a long string that
  // identifies a user. On the server, we generate this
  // JSON web token. So on the client, we need to store it
  // so we can send it back to the server for future API
  // calls.

  // JWT payload includes public properties about the user.
  // With this, every time we send a token from the client
  // to the server, we can easily extract the user ID from
  // the payload. If we need to know the name of the user,
  // then we can simply extract that here as well. We don't
  // have to query the database, send the ID to get a user
  // object, and then extract the name property. By the
  // same token, if you want to know if the user is an
  // admin user or not, we can include that here. So again,
  // we don't have to send an extra query to the database
  // to see if the user with a given ID is admin or not.
  // {
  //   "sub": "1234567890",
  //   "name": "John Doe",
  //   "admin": true,
  //   "iat": 1516239022
  // }

  res.send("Successfully logged in!");
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(2).max(255).email().required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
