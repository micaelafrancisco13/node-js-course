module.exports = function (error, req, res, next) {
  // When we call next() from the catch block, we'll end up
  // here. The "exception" argument we passed will be the
  // "error" argument in this function.

  // Now, in a real world application, the logic for logging
  // exception might be several lines long. We don't want to
  // add all that details in index.js. The details should
  // be encapsulated in different modules.
  // log the exception here...
  res.status(500).send("Something failed in the server.");
};
