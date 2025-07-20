// This is an example of synchronous or blocking program.
// In this program, when the first line executes, the
// program is blocking and the second line has to wait until
// the first line finishes execution.
// console.log("Before");
// console.log("After");

// In contrast, we have asynchronous or non-blocking
// program.
console.log("Before");
setTimeout(() => {
  // Simulating the action of reading a user from a 
  // database that is going to take two seconds.
  console.log("Reading a user from a database...");
}, 2000);
console.log("After");

// Output:
// Before
// After
// Reading a user from a database...

// Explanation:
// When we call setTimeout(), this function will schedule a 
// task to be performed in the future. In this case, two 
// seconds after. So two seconds after, it will call the 
// callback function that we pass as the first argument.

// asynchronous =/= concurrent/multi-threaded