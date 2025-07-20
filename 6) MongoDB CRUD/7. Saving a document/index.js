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

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  // This course object has a method called save. Here,
  // we're dealing with an asynchronous operation because
  // it's going to take some time to save this course in the
  // database because we're going to access the file system.

  // This returns the actual course object that is saved
  // in the database.
  // When we save this course in MongoDB, MongoDB is going
  // to assign a unique identifier to this course object.
  console.log(await course.save());
}

createCourse();
