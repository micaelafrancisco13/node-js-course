const winston = require("winston");

module.exports = function (error, req, res, next) {
  // log the exception here...
  // winston.log(logging_level)
  // Logging level determines the importance of the message
  // we're going to log.
  // error - most important
  // warn
  // info
  // verbose
  // debug
  // silly
  winston.error(error.message, { metadata: error.stack });

  res.status(500).send("Something failed in the server.");
};
