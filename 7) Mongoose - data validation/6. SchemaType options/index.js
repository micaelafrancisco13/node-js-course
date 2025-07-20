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
    // more useful properties such as the following
    lowercase: true,
    trim: true, // removes padding
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (value) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const result = value && value.length > 0;
            resolve(result);
          }, 1000);
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

    // We have a couple more properties in this schema type
    // object and these properties can be used when defining
    // any property irrespective of its type.
    // For example, let's say we always want to round the
    // value of the price property.

    // We can define a custom getter and a custom setter.
    // So whenever we set this price property, the set()
    // will be called, and here we'll round that value.
    get: (value) => Math.round(value),

    // If you read one of the courses and then access the
    // price property, our get() will be called, and here,
    // we'll round that value.
    set: (value) => Math.round(value),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular course",
    category: "WEB",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
    price: 13.8,
  });

  try {
    console.log(await course.save());
  } catch ({ errors }) {
    for (let field in errors) console.log(errors[field].message);
  }
}

createCourse();
