const { default: mongoose } = require("mongoose");

require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB...", error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// We need to compile this schema into a model.
// This returns a class
const Course = mongoose.model("Course", courseSchema);

// In this constructor function, we pass an object to
// initialize our course object.
const course = new Course({
  name: "Node.js course",
  author: "Mosh",
  tags: ["node", "backend"],
  // date has a default value
  isPublished: true,
});

// Summary:
// Schema => Model => Class => Object that maps to a 
// document in the MongoDB collection
