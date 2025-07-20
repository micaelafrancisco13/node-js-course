const { default: mongoose } = require("mongoose");

// load mongoose
require("mongoose");

// connect to MongoDB
// When you want to deploy your application to a production
// environment, you're going to have a different connection
// string for the production environment.
// "mongodb://localhost/db_name"
// The first time you write something to "playground"
// database, MongoDB will automatically create this
// database for us.
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB...", error));
