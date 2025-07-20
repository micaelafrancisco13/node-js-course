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
  // Comparison operators:
  // eq- equal
  // ne- not equal
  // gt- greater than
  // gte- greater than or equal to
  // lt- less than
  // lte- less than or equal to
  // in
  // nin- not in

  // { price: 10 } - exactly 10
  // { price: { $gt: 10 } } - greater than 10
  // { price: { $gt: 10, $lte: 20 } } - from > 10 to 20
  // { price: { $in: [10, 15, 20] } } - exactly 10, 15 or 20
  const courses = await Course
    // .find({ author: "Mosh", isPublished: true })
    .find({ price: { $in: [10, 15, 20] } })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

getCourses();
