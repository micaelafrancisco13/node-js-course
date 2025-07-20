const express = require("express");
const app = express();

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// first endpoint: getting all the courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// second endpoint: getting a single course
app.get("/api/courses/:id", (req, res) => {
  const courseId = req.params.id;
  // look for the course with the given id
  const course = courses.find((course) => course.id === parseInt(courseId));
  // if the course is not found, return a status code 404
  if (!course)
    return res
      .status(404)
      .send(`The course with the id of ${courseId} was not found.`);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
