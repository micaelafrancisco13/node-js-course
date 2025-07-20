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

// Removing documents from a MongoDB database...

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });

  // this returns { acknowledged: true, deletedCount: 0 }
  console.log(result);
 
  // Get the document that was deleted...
  // const course = await Course.findByIdAndRemove(id)
  // console.log(course);
}

removeCourse("62d269f379fa733635291300");
