const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const authenticate = require("./middleware/authenticator");
const home = require("./routes/home");
const courses = require("./routes/courses");
const express = require("express");
const app = express();

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// 3rd-party middleware
app.use(helmet());
if (app.get("env") === "development") {
  console.log("Morgan enabled...");
  app.use(morgan("tiny"));
}

// custom middleware
app.use(logger);
app.use(authenticate);
// For any routes that start with "/api/courses", use the
// "courses" router.
app.use("/", home);
app.use("/api/courses", courses);

// Take out all the code for the courses API and put it
// into a separate file.

// Do the same thing with all the middleware functions.

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
