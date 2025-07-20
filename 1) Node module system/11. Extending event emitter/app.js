/**
 * @file app.js
 * @module app
 * @description This script demonstrates how to use a custom class that has
 * inherited from EventEmitter. It creates an instance of the Logger, registers
 * a listener on it, and then calls a method that internally triggers an event.
 */

/**
 * The imported Logger class.
 * @const {class} Logger
 */
const Logger = require("./logger");

/**
 * An instance of the Logger class. This object can both log messages and
 * have listeners registered on it.
 * @const {Logger} logger
 */
const logger = new Logger();

/**
 * Registers a listener on the `logger` instance. This callback will execute
 * whenever the 'messageLoggedEvent' is emitted from within the `logger.log()` method.
 * @listens {Logger#messageLoggedEvent}
 */
logger.on("messageLoggedEvent", (arg) => {
  console.log("Listener called", arg);
});

// Call the log() method. This action will log the message and also
// trigger the event listener registered above.
logger.log("This is my message.");