/**
 * @file app.js
 * @module app
 * @description
 * This file demonstrates the use of Node.js's built-in `path` module
 * to parse file path information.
 */

/**
 * Imports the built-in 'path' module. This module provides utilities for
 * working with file and directory paths in a cross-platform manner.
 * @const {object} path
 */
const path = require("path");

/**
 * An object containing the parsed components of the current file's path.
 * The `path.parse()` method takes a path string (`__filename` in this case)
 * and returns an object detailing its components.
 *
 * @const {object} pathObject
 * @property {string} root - The root of the path (e.g., '/').
 * @property {string} dir - The directory path.
 * @property {string} base - The full filename (e.g., 'app.js').
 * @property {string} ext - The file extension (e.g., '.js').
 * @property {string} name - The filename without the extension (e.g., 'app').
 */
const pathObject = path.parse(__filename);

// Logs the parsed path object to the console.
console.log(pathObject);