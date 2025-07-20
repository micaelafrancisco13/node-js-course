/**
 * @file app.js
 * @module app
 * @description
 * This script demonstrates how to pass data payloads (event arguments) with
 * events using the `EventEmitter`. When raising an event, you can include
 * additional data to provide context to the event listeners.
 */

/**
 * The `EventEmitter` class from Node.js's built-in 'events' module.
 * @const {class} EventEmitter
 */
const EventEmitter = require("events");

/**
 * An instance of the EventEmitter class used to manage events.
 * @const {EventEmitter} emitter
 */
const emitter = new EventEmitter();

/**
 * Registers a listener for the 'messageLoggedEvent'. The listener's callback
 * function is defined to accept an argument, which will be the data payload
 * passed when the event is emitted.
 *
 * @param {string} eventName - The name of the event to listen for.
 * @param {function(object): void} listener - The callback function.
 * @param {object} payload - The data object passed with the event.
 */
emitter.on("messageLoggedEvent", (payload) => {
  console.log("Listener 1 called", payload);
});

emitter.on("messageLoggedEvent", (payload) => {
  console.log("Listener 2 called", payload);
});

/**
 * Emits the 'messageLoggedEvent' and includes an event argument (a data payload).
 * Any arguments provided to `emit()` after the event name are passed directly to
 * the listener functions in the order they are provided.
 */
emitter.emit("messageLoggedEvent", { id: 1, url: "https://" });