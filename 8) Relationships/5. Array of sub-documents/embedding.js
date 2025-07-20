const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: { type: String, required: true },
    // array of sub-documents
    authors: { type: [authorSchema], required: true },
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// Adding an author object later on...
async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);

  course.authors.push(author);
  await course.save();
}

// Removing an author...
async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  // We can look up a child object by its id
  const author = course.authors.id(authorId);
  author.remove();
  await course.save();
}

removeAuthor("62d8ee3dc04b0192b7ff9046", "62d8f0588b428d1d50566a68");
