/**
 * @file Provides a single, exportable logging function.
 * @module logger
 */

/**
 * A fictional URL endpoint for a remote logging service.
 * @private
 * @const {string}
 */
var url = "https://mylogger.io/log";

/**
 * Logs a given message to the console.
 * @param {string} message - The message to be logged.
 */
function log(message) {
  console.log(message);
}

/**
 * By assigning the `log` function directly to `module.exports`, the module's
 * public API becomes the function itself. This is a common pattern for creating
 * simple, single-purpose modules.
 *
 * The previous implementation was:
 * // module.exports.log = log;
 * @public
 */
module.exports = log;