console.log("Before");
// const user = getUser(1); doesn't work
// The reason for this is because the callback function that 
// we pass to setTimeout() is executed two seconds after. 
// So what we're returning from this function will not be 
// available at the time of calling getUser(), because in 
// this function, we're just calling setTimeout() to 
// schedule a task for the future.

// To fix this, we have 3 patterns:
// 1. Callbacks
// 2. Promises
// 3. Async/wait

getUser(1);
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    return { id: id, gitHubUsername: "Ela" };
  }, 2000);
}
