// A middleware function is basically a function that takes a 
// request object and either returns a response to the client 
// or passes control to another middleware function.

// We have already seen two examples of middleware functions.
// 1. Route handler function. 
// In Express, every route handler function we have is 
// technically a middleware function because it takes a 
// request object, and in this case, it returns a response to 
// the client. So it terminates the request-response cycle.
// 2. app.use(express.json())
// When we call express.json(), this method returns a 
// function, a middleware function. The job of this 
// middleware function is to read the request and if there is 
// a JSON object in the body of the request, it will parse 
// the body of the request into a JSON object and then it'll 
// set "req.body" property.

// Request processing pipeline...
// In this pipeline, we have one or more middleware functions. 
// Each middleware function either terminates the request-
// response cycle by returning a response object or it'll 
// pass control to another middle of a function.
// Request => json() => route() => Response