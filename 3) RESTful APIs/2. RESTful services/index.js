// The app itself is the client or the front end part.
// Under the hood, it needs to talk to a server or the
// back-end to get or save the data. This communication
// happens using the HTTP protocol, the same protocol that
// powers our web. So on the server, we expose a bunch of
// services that are accessible via the HTTP protocol. The
// client can then directly call the services by sending
// HTTP requests.

// Every HTTP request has what we call a verb or a method
// that determines its type or intention. Here are the
// standard HTTP methods. We have GET for getting data,
// POST for creating data, PUT for updating data, and
// DELETE for deleting data.

// Getting all the list of customers...
// Send an HTTP request to this endpoint:
// GET /api/customers
// When we send an HTTP GET request to this endpoint, our
// service should send us something like this:
// [
//   { id: 1, name: "" },
//   { id: 2, name: "" },
//   ....
// ]

// Getting a single customer from the list...
// Send an HTTP request to this endpoint:
// GET /api/customers/13
// Response:
// { id: 13, name: "" }

// Updating a customer...
// Send an HTTP request including the customer object to
// this endpoint:
// PUT /api/customers/13
// { name: "" }
// Response:
// { id: 13, name: "" }

// Deleting a customer...
// Send an HTTP request to this endpoint:
// DELETE /api/customers/13

// Creating a customer...
// Send an HTTP request including the customer object to
// this endpoint: 
// POST /api/customers
// { id: 14, name: "" }