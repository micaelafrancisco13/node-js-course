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

  console.log(await course.save());
}

// Retrieving documents from a MongoDB database...
async function getCourses() {
  // Returns all courses
  // const courses = await Course.find();

  // Returns all publish courses by Mosh
  // Limit only to 10 documents returned
  // Sort: 1 --> ascending, -1 --> descending
  // Select only the "name" and "tags" properties
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  // .sort({ price: -1 }) -> ("-price")
  // .select({ name: 1, author: 1 }) -> ("name author")

  console.log(courses);
}

getCourses();
