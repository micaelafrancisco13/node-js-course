// This error middleware only captures errors that happen as 
// part of request processing pipeline. This is particular to 
// Express. If an error is thrown outside the context of 
// Express, this middleware will not be caught.

const winston = require("winston");

module.exports = (error, req, res, next) => {
  winston.error(error.message, { metadata: error.stack });

  res.status(500).send("Something failed in the server.");
};
