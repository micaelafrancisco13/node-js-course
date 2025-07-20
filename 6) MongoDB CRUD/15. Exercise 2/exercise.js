const { default: mongoose } = require("mongoose");

require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB...", error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return Course.find({ isPublished: true })
    .sort({ price: -1 }) // ("-price")
    .select({ name: 1, author: 1 }); // ("name author")
}

async function displayCourses() {
  const courses = await getCourses();
  console.log(courses);
}

displayCourses();
