/**
 * The `console` object is a global object in Node.js, available in all modules.
 * It provides a simple debugging console similar to the JavaScript console mechanism
 * provided by web browsers.
 * @global
 */
console.log(`Hi`);

/**
 * @namespace global
 * @description
 * In Node.js, the `global` object acts as the global scope, similar to the `window`
 * object in web browsers. It contains built-in global functions and objects.
 *
 * Common global functions include:
 * - `setTimeout()` & `clearTimeout()`
 * - `setInterval()` & `clearInterval()`
 *
 * These functions can be accessed directly or as properties of the `global` object
 * (e.g., `global.setTimeout`).
 */

/**
 * @module
 * @description
 * This file demonstrates a key concept of the Node.js module system.
 * Variables and functions declared at the top level of a Node.js file are scoped
 * to that specific module. They are not added to the `global` object, which
 * prevents global namespace pollution.
 */

/**
 * This variable is private to the current module and not accessible globally.
 * @type {string}
 */
var message = "This variable is private to this module.";

// This will log 'undefined' because the 'message' variable is not on the global object.
console.log(global.message);