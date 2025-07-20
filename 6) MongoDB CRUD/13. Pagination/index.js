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

// Retrieving documents from a MongoDB database...

async function getCourses() {
  // In a real world application, we pass these values as
  // query string parameters to our restful APIs.
  // /api/courses?pageNumber=2&pageSize=4

  // page 1: 0 - 1 - 2 - 3
  // page 2: 4 - 5 - 6 - 7
  // page 2 starts with the item at index 4

  const pageNumber = 2;
  const pageSize = 4;
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

getCourses();
