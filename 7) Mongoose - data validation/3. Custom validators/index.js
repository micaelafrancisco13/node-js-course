const { default: mongoose } = require("mongoose");

require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB...", error));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 255 },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,

  // With require validator, we can simply pass an empty
  // array.
  tags: {
    type: Array,
    // So here, we need a custom validator.
    validate: {
      validator: function (value) {
        // if true, then the property will be valid
        return value && value.length > 0;
      },
      message: "A course should have at least 1 tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () { 
      return this.isPublished;
    },
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
