/**
 * @file logger.js
 * @module logger
 * @description
 * This module exports a custom Logger class. The class extends
 * Node.js's built-in EventEmitter to combine logging functionality with
 * event notification capabilities.
 */

const EventEmitter = require("events");

/**
 * A fictional URL endpoint for a remote logging service.
 * @private
 * @const {string}
 */
const url = "https://mylogger.io/log";

/**
 * @typedef {Object} MessageLoggedEventPayload
 * @property {number} id - The ID of the log message.
 * @property {string} url - A URL associated with the log message.
 */

/**
 * Emitted when a message is successfully logged.
 * @event Logger#messageLoggedEvent
 * @type {MessageLoggedEventPayload}
 */

/**
 * The Logger class handles logging messages and emits an event upon completion.
 * By extending EventEmitter, it inherits methods like `.on()` and `.emit()`,
 * allowing it to function as an event emitter itself.
 *
 * @class Logger
 * @extends {EventEmitter}
 */
class Logger extends EventEmitter {
  /**
   * Logs a message and subsequently emits a 'messageLoggedEvent'.
   *
   * @param {string} message - The message to be logged.
   * @fires Logger#messageLoggedEvent
   */
  log(message) {
    // In a real app, this would send an HTTP request.
    console.log(message);

    // Raise an event with a payload to notify listeners.
    this.emit("messageLoggedEvent", { id: 1, url: "https://some-url.com" });
  }
}

module.exports = Logger;
