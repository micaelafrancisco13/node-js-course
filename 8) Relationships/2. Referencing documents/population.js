const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// How to reference a document in another document..?

// First model
const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

// Second model
const Course = mongoose.model(
  // We're going to add another property called "author",
  // and there, we'll reference an author document in our
  // database.
  // When saving a course object, only the properties that 
  // you have defined in your model will be persistent in 
  // the database.
  "Course",
  new mongoose.Schema({
    name: String,
    // The "ObjectId" references the author id in the 
    // authors collection.
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  })
);

// Helper functions...
async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find().select("name");
  console.log(courses);
}

// createAuthor("Ela", "My bio", "My Website");

createCourse("Node Course", "62d8298c0d874547d2ecf316");

// listCourses();
