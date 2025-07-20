/**
 * @module
 * @description
 * This file demonstrates the core principles of the Node.js module system.
 * Modularity is essential for creating organized and maintainable applications.
 * It prevents naming conflicts by encapsulating code within separate scopes.
 *
 * In Node.js, every file is a module. All variables and functions defined within a
 * file are private to that module by default. To make them accessible to other
 * parts of the application, they must be explicitly exported using the `module.exports` object.
 */

/**
 * The `module` object is a global variable that represents the current module.
 * It contains metadata about the file, including its unique ID, file path,
 * and most importantly, an `exports` object that determines what the module makes public.
 *
 * @property {string} id
 * - The identifier for the module (e.g., '.').
 * @property {string} path
 * - The directory name of the module.
 * @property {Object} exports
 * - The object that is returned when this module is required by another file.
 * You can attach properties or functions to this object to make them public.
 * @property {string} filename
 * - The fully resolved filename of the module.
 * @property {boolean} loaded
 * - A boolean indicating if the module has finished loading.
 * @property {Array<Object>} children
 * - An array of module objects required by this module.
 * @property {Array<string>} paths
 * - The search paths for the module.
 */
module.exports.message = "This variable is public to other modules.";
console.log(module);