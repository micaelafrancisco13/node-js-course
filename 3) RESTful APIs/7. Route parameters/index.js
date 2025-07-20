const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Creating a route to get a single course...
// endpoint: /api/courses/1
app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

// "id" is the name of the parameter
app.get("/api/courses/:id", (req, res) => {
  // to read this parameter...
  res.send(req.params.id);
});

// dealing with multiple parameters...
app.get("/api/posts/:year/:month", (req, res) => {
  // to read this parameter...
  // returns {"year":"2018","month":"1"}
  res.send(req.params); 
});

// dealing with query strings...
app.get("/api/posts/:year/:month", (req, res) => {
  // to read this parameter...
  // returns {"sortBy":"name"}
  res.send(req.query); 
});

// We use route parameters for essential/required values, 
// whereas we use query string parameters for anything that 
// is optional.

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
