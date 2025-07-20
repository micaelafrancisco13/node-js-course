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
    name: String,
    // We're going to embed an author document directly
    // inside of a course document.
    author: { type: authorSchema, required: true },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// Note that these sub-documents cannot be saved on their
// own. They can only be saved in the context of their
// parent. For example...
async function updateAuthor(courseId) {
  const course = await Course.findByIdAndUpdate(
    courseId,
    // { $set: { name: "JavaScript", "author.name": "Micaela" } },

    // removes the "website" property of an author
    // { $unset: { "author.website": "" } },

    // removes the entire author property of the given
    // course
    // { $unset: { "author": "" } },

    { new: true }
  );

  course.save();
  // course.author.save(); - this doesn't exist
}

// Instead of passing an id as the 2nd argument, we pass an
// object.
createCourse(
  "Node Course",
  new Author({
    name: "Ela",
    bio: "Born in 2001.",
    website: "micaelafrancisco13",
  })
);

// "author" property is a sub-document
// Sub-documents are like normal documents. Most features
// that are available on normal documents are also available
// in sub-documents. We can enforce that "author.name"
// should be required.

// This returns
// {
//   name: 'Node Course',
//   author: { name: 'Ela', _id: new ObjectId("62d8c5aa5b0a1dabd2f3d3a7") },
//   _id: new ObjectId("62d8c5aa5b0a1dabd2f3d3a8"),
//   __v: 0
// }
