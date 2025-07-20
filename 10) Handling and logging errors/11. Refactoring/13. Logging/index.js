const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();

// load the logging module
require("./startup/logging")();
require("./startup/database")();
require("./startup/routes")(app);

// private ket configuration for web tokens
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
// $env:vidly_jwtPrivateKey = "mySecureKey" on terminal

process.env.PORT = 4000;
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
