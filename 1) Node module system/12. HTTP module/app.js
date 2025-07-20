/**
 * @file app.js
 * @module app
 * @description
 * This script demonstrates the creation of a basic web server using the built-in
 * Node.js `http` module. This module is a foundational part of Node's networking
 * capabilities, allowing it to handle HTTP traffic directly.
 */

/**
 * The built-in `http` module, providing functionality to create HTTP servers and clients.
 * @const {object} http
 */
const http = require("http");

/**
 * An instance of an HTTP server. The `http.Server` class inherits from
 * `EventEmitter`, so it can emit events like 'request' and 'connection'.
 *
 * The callback function passed to `createServer` is a listener that executes
 * each time a 'request' event is emitted.
 *
 * @const {http.Server} server
 * @param {function(http.IncomingMessage, http.ServerResponse): void} requestListener - A function that handles incoming requests.
 */
const server =
    http.createServer((req, res) => {
        // Simple routing: respond only to requests for the root path.
        if (req.url === "/") {
            res.write("Hello world");
            res.end();
        }
    });

/**
 * Binds the server to port 3000 on the local machine and starts listening
 * for incoming connections.
 */
server.listen(3000);

console.log("Listening on port 3000...");