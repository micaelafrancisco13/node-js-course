// load JOI package
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const courseId = req.params.id;
  const course = courses.find((course) => course.id === parseInt(courseId));
  if (!course)
    return res
      .status(404)
      .send(`The course with the id of ${courseId} was not found.`);
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  // With Joi...
  // 1. Define a schema
  const schema = Joi.object({
    // id: Joi.required(),
    name: Joi.string().min(3).required(),
  });

  // 2. Validate
  const result = schema.validate(req.body);
  const errorMessage = result.error.details[0].message;
  if (result.error) return res.status(404).send(errorMessage);

  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);

  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
