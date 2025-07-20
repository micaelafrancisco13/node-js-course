/**
 * @file app.js
 * @module app
 * @description
 * This script demonstrates the fundamentals of the Node.js event system using
 * the `EventEmitter` class. An event is a signal that something has happened
 * in an application. This pattern is central to Node's asynchronous,
 * non-blocking architecture, allowing different parts of an application to react
 * to occurrences without being tightly coupled.
 *
 * For example, a web server might emit a 'request' event each time it
 * receives a new connection, allowing the application to handle it.
 */

/**
 * Importing the EventEmitter class from the 'events' module.
 * This class provides the functionality to implement event-driven architecture.
 */
const EventEmitter = require("events");

/**
 * An instance of the EventEmitter class. This object will be used to
 * both emit events and register event listeners.
 * @const {EventEmitter} emitter
 */
const emitter = new EventEmitter();

/**
 * Registers a listener for the 'messageLoggedEvent'.
 * A listener is a callback function executed when a specific event
 * is raised. The `emitter.on()` method is used to associate a listener
 * with an event name.
 * @listens {EventEmitter#messageLoggedEvent}
 */
emitter.on("messageLoggedEvent", function () {
  console.log("Listener 1 called");
});

emitter.on("messageLoggedEvent", function () {
  console.log("Listener 2 called");
});

/**
 * Raises, or "emits," the 'messageLoggedEvent'.
 * Calling `emitter.emit()` with an event name will synchronously execute all
 * listener functions that have been registered for that event.
 */
emitter.emit("messageLoggedEvent");