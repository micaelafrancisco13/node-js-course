function log(req, res, next) {
  // let's imagine this middle of our function is for
  // logging every request
  console.log("Logging...");

  // passes control to the next middleware function in the
  // pipeline
  next();
}

module.exports = log;
