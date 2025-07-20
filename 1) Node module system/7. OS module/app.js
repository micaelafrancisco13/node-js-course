/**
 * @file app.js
 * @module app
 * @description
 * This script demonstrates a key capability of Node.js: interacting with the
 * underlying operating system. Unlike browser-based JavaScript, which is
 * sandboxed, Node.js can perform system-level operations.
 *
 * It uses the built-in 'os' module to retrieve information about the host
 * machine's memory, a task not possible with client-side JavaScript.
 */

/**
 * Imports the built-in 'os' module, which provides operating system-related
 * utility methods and properties.
 * @const {object} os
 */
const os = require("os");

/**
 * Stores the total amount of system memory in bytes.
 * @const {number} totalMemory
 */
const totalMemory = os.totalmem();

/**
 * Stores the amount of free system memory in bytes.
 * @const {number} freeMemory
 */
const freeMemory = os.freemem();

// Log the collected memory information to the console.
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);