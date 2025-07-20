/**
 * @file logger.js
 * @module logger
 * @description
 * This module demonstrates how Node.js achieves private scope for its modules.
 * Before execution, Node.js wraps the entire code of a module within an
 * Immediately Invoked Function Expression (IIFE), often called the "Module Wrapper".
 *
 * This wrapper function is what keeps top-level variables scoped to the module
 * rather than making them global.
 *
 * The structure of the wrapper looks like this:
 * ```js
 * (function (exports, require, module, __filename, __dirname) {
 *   // Your module's code goes here
 * });
 * ```
 * This explains why `exports`, `require`, `module`, `__filename`, and `__dirname`
 * are available in every file, as they are the parameters passed to your module.
 */

/**
 * `__filename` is a module-scoped variable that contains the absolute path of
 * the currently executing file.
 * @type {string}
 */
console.log(__filename);

/**
 * `__dirname` is a module-scoped variable that contains the name of the directory
 * that the currently executing script resides in.
 * @type {string}
 */
console.log(__dirname);

/**
 * A fictional URL endpoint for a remote logging service.
 * @private
 * @const {string}
 */
var url = "https://mylogger.io/log";

/**
 * Logs a given message to the console.
 * @param {string} message The message to be logged.
 */
function log(message) {
  console.log(message);
}

/**
 * Exports the `log` function as the public API for this module.
 * @public
 */
module.exports = log;