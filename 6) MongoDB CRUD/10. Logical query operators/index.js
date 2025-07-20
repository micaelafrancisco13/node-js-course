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

// Retrieve the courses that are published, but they are not
// necessarily authored by Mosh. That's where we need the
// "OR" operator.

// .or([{ filter_1 }, { filter_2 }])

async function getCourses() {
  const courses = await Course
    // .find({ author: "Mosh", isPublished: true })
    .find()
    .or([{ author: Mosh }, { isPublished: true }])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

getCourses();
