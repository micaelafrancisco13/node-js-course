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
const app = express();

// File transport
winston.add(new winston.transports.File({ filename: "logfile.log" }));

// MongoDB transport
// So next time there is an error in the application,
// because we have another transport, Winston will
// automatically store our error in MongoDB.
winston.add(
  new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
);

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
