const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

// When you deploy this app to a hosting environment, the
// port is dynamically assigned by the hosting environment.
// So we can't rely on 3000 to be available.

// To fix this...
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// To set an environment variable on VSCode terminal...
// $env:PORT = 5000
