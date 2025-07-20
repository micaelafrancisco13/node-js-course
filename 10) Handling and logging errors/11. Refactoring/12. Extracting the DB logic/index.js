require("express-async-errors");
require("winston-mongodb");
const winston = require("winston");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();

// load the db function
require("./startup/database")();
require("./startup/routes")(app);

// handling  and logging exceptions
process.on("uncaughtException", (exception) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  winston.error(exception.message, { metadata: exception.stack });
  process.exit(1);
});

process.on("unhandledRejection", (exception) => {
  console.log("WE GOT AN UNHANDLED REJECTION");
  winston.error(exception.message, { metadata: exception.stack });
  process.exit(1);
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
);

// private ket configuration for web tokens
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
// $env:vidly_jwtPrivateKey = "mySecureKey" on terminal

process.env.PORT = 4000;
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
