const { default: mongoose } = require("mongoose");

require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB...", error));

const courseSchema = new mongoose.Schema({
  // Implementing the "required" validator...

  // With this, if you create a course without a name, at
  // the time you try to save this course to the database,
  // you'll get an exception (rejected promise).
  name: { type: String, required: true },

  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    // By default, all these properties that we define here,
    // they're optional.

    // MongoDB doesn't care that we have a course that
    // doesn't have a name or doesn't have a price.

    // Go to the schema
    name: "Angular course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
    price: Number,
  });

  try {
    console.log(await course.save());
  } catch (exception) {
    console.log(exception.message);
  }
}

createCourse();
