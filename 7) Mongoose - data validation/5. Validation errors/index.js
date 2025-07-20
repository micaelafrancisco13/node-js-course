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
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular course",
    // category: "web",
    author: "Mosh",
    // tags: ["angular", "frontend"],
    isPublished: true,
    price: 13,
  });

  // In "exception.errors" object, we have a separate
  // property for each invalid property in our course
  // object. This object that we get will have two
  // properties. One is tags, the other is category.

  // 1. exception.errors.category
  // 2. exception.errors.tags
  // field - category
  // field - tags

  try {
    console.log(await course.save());
  } catch ({ errors }) {
    for (let field in errors) console.log(errors[field].message);
  }
}

createCourse();

// errors: {
//   tags: ValidatorError: A course should have at least 1 tag.
//       at validate (C:\Users\Micaela\Documents\Source files\node js\mongo-demo\node_modules\mongoose\lib\schematype.js:1329:13)
//       at C:\Users\Micaela\Documents\Source files\node js\mongo-demo\node_modules\mongoose\lib\schematype.js:1305:24 {
//     properties: [Object],
//     kind: 'user defined',
//     path: 'tags',
//     value: [],
//     reason: undefined,
//     [Symbol(mongoose:validatorError)]: true
//   }
// }
