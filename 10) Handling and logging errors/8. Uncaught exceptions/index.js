const winston = require("winston");
require("winston-mongodb"); // load the module
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

// Handling unhandled exceptions in a Node process...
// on() - subscribes to an event
// "uncaughtException" is an event that's raised when we 
// have an exception in the Node process, but nowhere we 
// have handled that exception using a catch block.
process.on("uncaughtException", (exception) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  winston.error(exception.message, { metadata: exception.stack });
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
);

// error simulation
throw new Error("Something failed during startup.");
// If you look at log file, you can see there is nothing
// there.

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
