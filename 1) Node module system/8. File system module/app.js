/**
 * @file app.js
 * @module app
 * @description
 * This script demonstrates the proper use of the Node.js File System (`fs`)
 * module with an emphasis on asynchronous, non-blocking methods.
 *
 * While the `fs` module provides both synchronous (blocking) and asynchronous
 * (non-blocking) versions for most of its methods, it is a core principle in
 * Node.js to use the asynchronous variants in production code. This prevents
 * blocking the main thread, allowing the application to handle other requests
 * while waiting for I/O operations to complete.
 */

/**
 * Imports the built-in 'fs' module, which provides an API for interacting
 * with the file system.
 * @const {object} fs
 */
const fs = require("fs");

/**
 * @callback readdirCallback
 * @description This is a standard Node.js error-first callback.
 * @param {Error | null} err - An Error object if an issue occurred, otherwise null.
 * @param {string[]} files - An array of strings containing the names of the files in the directory.
 */

/**
 * Asynchronously reads the contents of the current directory ('./').
 *
 * It passes a callback function that Node.js will execute once the I/O
 * operation is complete. The callback will receive either an error object or the
 * result (an array of file names).
 * @param {string} path - The directory path to read.
 * @param {readdirCallback} callback - The function that handles the response.
 */
fs.readdir("./", function (err, files) {
  if (err) console.log("Error", err);
  else console.log("Result", files);
});