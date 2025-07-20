// building a web server
// "express" is a function and express() returns an object
const express = require("express");
const app = express();

// demonstrating app.get()...
// app.HTTP_METHOD(path, callback_func(req, res))

app.get("/", (req, res) => {
  // When we get an HTTP GET request from the root of our
  // website, we're gonna respond with the "hello world"
  // message.
  res.send("Hello world");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

// listen to a given port
app.listen(3000, () => console.log("Listening on port 3000..."));
