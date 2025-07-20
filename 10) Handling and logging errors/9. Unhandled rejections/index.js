const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const error = require("./middleware/error");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const { exceptions } = require("winston");
const app = express();

// NOTE: This approach only works with synchronous code. In
// other words, if you have a promise somewhere, and that
// promise is rejected, this code will not be executed.
process.on("uncaughtException", (exception) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  winston.error(exception.message, { metadata: exception.stack });
  process.exit(1);
});

// Handling promise rejections...
process.on("unhandledRejection", (exception) => {
  console.log("WE GOT AN UNHANDLED REJECTION");
  winston.error(exception.message, { metadata: exception.stack });
  process.exit(1);
});
 
// Whether you're dealing with an uncaught exception or an
// unhandled rejection, as a best practice, you should
// terminate the Node process.
// process.exit(1);

// How are we going to restart it in production? There are
// tools for that which we call "process managers"

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
);

// error simulation
const promise = Promise.reject(new Error("A promise is rejected."));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
// $env:vidly_jwtPrivateKey = "mySecureKey" on terminal

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB...", error));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

process.env.PORT = 4000;
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
