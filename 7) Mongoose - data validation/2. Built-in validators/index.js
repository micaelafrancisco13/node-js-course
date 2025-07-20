const { default: mongoose } = require("mongoose");

require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB...", error));

const courseSchema = new mongoose.Schema({
  // Depending on the type of properties we have here, we
  // have additional built-in validators.
  // For example, with strings, you also have "minlength"
  // "maxlength", "match", and "enum"
  name: { type: String, required: true, minlength: 2, maxlength: 255 },

  // When creating a course, the category we set should be
  // one of these values, otherwise, we're going to get a
  // validation error.
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,

  // This required property here, we can set that to a
  // Boolean or a function that returns a Boolean.
  // For example, let's imagine that price is only required
  // if the course is published.
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    // We also have "min" and "max" for numbers
    min: 10,
    max: 200,
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular course",
    category: "web",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
    price: 13,
  });

  try {
    console.log(await course.save());
  } catch (exception) {
    console.log(exception.message);
  }
}

createCourse();
