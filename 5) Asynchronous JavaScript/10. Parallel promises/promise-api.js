// Sometimes you want to run a few asynchronous operations
// in parallel, and when they all complete, you want to do
// something after.

const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Calling Facebook API...");
    resolve({ id: 1, name: "Facebook" });
  }, 2000);
});

const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Calling Twitter API...");
    resolve({ id: 2, name: "Twitter" });
  }, 2000);
});

// This method will return a new promise that will be
// resolved when all the promises in this array are
// resolved.
Promise.all([promise1, promise2])
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// We are not waiting for the result of the first
// asynchronous operation to be ready in order to kick off
// the second asynchronous operation.
// The result will be available as array, in this case,
// that array has 2 values.
// If one of these promises fail, that final promise that
// is returned from Promise.all() is considered rejected.

// What if you just want to do something as soon as the
// first operation completes.
// Use
Promise.race();
// As soon as one promise in this array is fulfilled, the
// promise that is returned from this race method will be
// considered fulfilled. In this case, the result we have
// is not an array, it is the value of the first fulfilled
// promise.
