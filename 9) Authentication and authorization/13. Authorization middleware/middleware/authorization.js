const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  // if there is no token
  if (!token) return res.status(401).send("Access denied. No token provided.");

  // Validating the given token...
  // If the token is valid, it will decode it and return
  // the payload. However, if this token is not valid, it
  // will throw an exception.
  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = payload;
    // pass control to the next middleware
    next();
  } catch (exception) {
    res.status(400).send("Invalid token.");
  }
};
