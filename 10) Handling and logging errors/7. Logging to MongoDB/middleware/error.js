const winston = require("winston");

module.exports = (error, req, res, next) => {
  winston.error(error.message, { metadata: error.stack });

  res.status(500).send("Something failed in the server.");
};
