const jwt = require("jsonwebtoken");
const config = require("config");

// This middleware function will be executed after our
// "authorization" middleware function.
module.exports = function (req, res, next) {
  // The authorization middleware function sets "req.user"
  // so we can access "req.user" in this function.

  // 401 unathorized
  // - When the user tries to access a protected resource
  //   but they don't supply a valid JSON web token. So we
  //   give them a chance to retry and send a valid JSON
  //   web token.

  // 403 forbidden
  // - When a user sends a valid JSON web token and
  //   they're still not allowed to access the target
  //   resource. "Don't try again" to the user.

  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  // Otherwise, if the user is admin, we'll pass control to 
  // the next middleware function.
  next();
};
