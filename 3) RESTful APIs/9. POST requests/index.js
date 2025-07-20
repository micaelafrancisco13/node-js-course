const express = require("express");
const app = express();

// a piece of middleware
// parser of JSON objects in the request body
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

// handling a POST request
// app.post(path, callback_func(req, res))
app.post("/api/courses", (req, res) => {
  // We need to read the course object that should be in
  // the body of the request. Use these properties to
  // create a new course object and then add that course
  // object to our courses array.

  // We're assuming that in the request body, we have an
  // object and that object has a "name" property.
  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);

  // By convention, when we post an object to the server,
  // when the server creates a new object or a new resource,
  // you should return that object in the body of the
  // response.
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
