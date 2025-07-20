// Returns a promise that is already resolved.

const promise1 = Promise.resolve({ id: 1, name: "Ela" });
promise1.then((result) => console.log("Result", result));

// Returns a promise that is already rejected.
const promise2 = Promise.reject(new Error("Reason for rejection..."));
promise2.catch((error) => console.log(error));
