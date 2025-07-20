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
  tags: {
    type: Array,
    validate: {
      // Sometimes the validation logic may involve reading
      // something from a database or from a remote HTTP
      // service. Hence, we don't have the answer straight
      // away. In that case, we need an asynchronous
      // validator. 

      // To do this, add "isAsync" property and convert the
      // function defined in the "validator" to a function 
      // that returns a promise.
      isAsync: true,
      validator: function (value) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const result = value && value.length > 0;
            resolve(result);
          }, 4000);
        });
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
    // tags: ["angular", "frontend"],
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
