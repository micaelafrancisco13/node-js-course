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

// Updating documents from a MongoDB database...

async function updateCourse(id) {
  // There are basically two ways to update a document in
  // MongoDB.
  // 1. Find by id -> modify its properties -> save
  // 2. Update directly -> save (get document is optional)

  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Another author";

  // course.set is identical to assignment operator above
  // course.set({
  //   isPublished: true,
  //   author: "Another author",
  // });

  // returns the course object that was updated
  const result = await course.save();
  console.log(result);
}

updateCourse("62d269f379fa733635291300");
