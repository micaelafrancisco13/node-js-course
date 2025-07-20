const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./logger");
const authenticate = require("./authenticator");
const express = require("express");
const app = express();

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// 3rd-party middleware
app.use(helmet());
app.use(morgan("tiny")); // logs HTTP requests

// custom middleware
app.use(logger);
app.use(authenticate);

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
  const course = courses.find((c) => c.id === parseInt(courseId));
  if (!course)
    return res
      .status(404)
      .send(`The course with the id of ${courseId} was not found.`);
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (!error) {
    const course = { id: courses.length + 1, name: req.body.name };
    courses.push(course);
    res.send(course);
  } else {
    const errorMessage = error.details[0].message;
    return res.status(404).send(errorMessage);
  }
});

app.put("/api/courses/:id", (req, res) => {
  const courseId = req.params.id;
  const course = courses.find((c) => c.id === parseInt(courseId));
  if (!course)
    return res
      .status(404)
      .send(`The course with the id of ${courseId} was not found.`);

  const { error } = validateCourse(req.body);
  if (!error) {
    course.name = req.body.name;
    res.send(course);
  } else {
    const errorMessage = error.details[0].message;
    return res.status(404).send(errorMessage);
  }
});

app.delete("/api/courses/:id", (req, res) => {
  const courseId = req.params.id;
  const course = courses.find((c) => c.id === parseInt(courseId));
  if (!course)
    return res
      .status(404)
      .send(`The course with the id of ${courseId} was not found.`);

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
