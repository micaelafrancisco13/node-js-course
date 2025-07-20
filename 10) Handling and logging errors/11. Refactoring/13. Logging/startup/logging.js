// Handling and logging exceptions

const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  process.on("uncaughtException", (exception) => {
    console.log("WE GOT AN UNCAUGHT EXCEPTION");
    winston.error(exception.message, { metadata: exception.stack });
    process.exit(1);
  });

  process.on("unhandledRejection", (exception) => {
    console.log("WE GOT AN UNHANDLED REJECTION");
    winston.error(exception.message, { metadata: exception.stack });
    process.exit(1);
  });

  winston.add(
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
  );
};
