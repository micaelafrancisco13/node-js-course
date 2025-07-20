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

// If you wanna have more control over filtering strings,
// you need to use a regular expression.

async function getCourses() {
  const courses = await Course
    // .find({ author: "Mosh", isPublished: true })

    // starts with "Mosh"
    // ^ - starts with
    // append "i" at the end to make the query case-
    // insensitive
    .find({ author: /^Mosh/ })

    // ends with "Hamedani"
    // $ - ends with
    .find({ author: /Hamedani$/ })

    // contains the word "Mosh"
    .find({ author: /.*Mosh.*/ })

    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

getCourses();
