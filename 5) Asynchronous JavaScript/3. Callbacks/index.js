console.log("Before");

// getUser(1);
// Add another parameter called "callback function"
// A callback is a function that we're going to call when
// the result of an asynchronous operation is ready.

getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    console.log("Repositories", repos);
  });
});
console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    // return { id: id, gitHubUsername: "Ela" };
    callback({ id: id, gitHubUsername: "Ela" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Getting the repositories...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
