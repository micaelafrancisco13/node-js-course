/**
 * @file Main application file demonstrating module imports.
 * @module app
 */

/**
 * The `require` function is a built-in Node.js function used to load modules.
 * It reads and executes a JavaScript file, then returns its `module.exports` object.
 *
 * Since 'logger.js' now exports a single function directly, the `log` constant
 * becomes a reference to that function.
 * @const {function(string): void} log - The imported logging function.
 */
const log = require("./logger");

// Call the imported 'log' function to display a message.
log("this is a message");