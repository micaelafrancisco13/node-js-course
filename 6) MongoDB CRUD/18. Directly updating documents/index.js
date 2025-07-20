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

  // Updating multiple documents...
  // const result = await Course.updateMany({
  //   isPublished: false,
  // });

  // Updating a document directly in the database without
  // retrieving it first...
  // const result = await Course.updateOne(
  //   {
  //     _id: id,
  //   },
  //   {
  //     $set: {
  //       author: "Ela",
  //       isPublished: false,
  //     },
  //   }
  // );

  // returns
  // {
  //   acknowledged: true,
  //   modifiedCount: 0,
  //   upsertedId: null,
  //   upsertedCount: 0,
  //   matchedCount: 1
  // }
  // console.log(result);

  // Get the document that was updated...
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jack",
        isPublished: true,
      },
    },
    { new: true }
  );
  console.log(course);
}

updateCourse("62d269f379fa733635291300");
