/**
 * @file Provides reusable logging functionality.
 * @module logger
 * @description
 * This module is designed to handle logging messages, simulating a scenario where
 * logs are sent to a remote cloud service via an HTTP endpoint.
 */

/**
 * The URL endpoint for the remote logging service.
 * @private
 * @const {string}
 */
var url = "https://mylogger.io/log";

/**
 * Logs a message by simulating an HTTP request to the logging service.
 * For this example, it prints the message to the console.
 *
 * @param {string} message - The message content to be logged.
 */
function log(message) {
  // In a real application, this function would send an HTTP
  // request to the 'url' endpoint.
  console.log(message);
}

/*
 * To make the `log` function available to other modules, it is attached
 * to the `exports` object. Anything attached to `module.exports` becomes
 * part of the module's public API and can be imported elsewhere.
 */
module.exports.log = log;