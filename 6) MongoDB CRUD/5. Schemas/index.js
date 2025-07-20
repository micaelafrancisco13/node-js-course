const { default: mongoose } = require("mongoose");

require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB...", error));

// We use a schema to define the shape of documents within
// a collection in MongoDB.
// Collection - table
// Document - Row
// Each document is a container of key-value pairs

// We have this concept called schema. This is just
// specific to MongoDB. We use a schema in Mongoose to
// define the shape of documents in a MongoDB collection.
const courseSchema = new mongoose.Schema({
  // specify the key-value pairs
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
