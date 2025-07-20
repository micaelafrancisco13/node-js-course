// A promise is an object that holds the eventual result of
// an asynchronous operation. So when an asynchronous
// operation completes, it can either result in a value or
// an error. A promise basically promises you that it'll
// give you the result of an asynchronous operation.

// State of the object
// 1. Pending state
//    - When we create a promise object
//    - At this point, it will kick off some asynchronous
//      operation
// 2. Fulfilled state
//    - When the result is ready
//    - The asynchronous operation completed successfully
// 3. Rejected state
//    - Otherwise, if something went wrong during the
//      execution of that asynchronous operation
// Pending -> Resolved
// Pending -> Rejected

// Promise(func(resolve, reject))
const promise = new Promise((resolve, reject) => {
  // Kick off some asynch work...
  // ...

  // Eventually, when that asynch work completes, we should
  // either have a value or an error. If there is a value,
  // we want to return this to the consumers of this
  // promise.
  // To do this...
  setTimeout(() => {
    resolve({ id: 1, name: "Ela" });

    // Alternatively, if something goes wrong, we want to
    // return an error to the consumer of this promise.
    // reject(new Error("message"));
  }, 2000);
});

// Consuming of the promise...
// promise.catch() - for catching any errors
// promise.then() - for getting the result
promise
  .then((result) => console.log("Result", result))
  .catch((error) => console.log("Error", error.message));
