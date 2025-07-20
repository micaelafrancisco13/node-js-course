console.log("Before");

getUser(1, getRepositories);
console.log("After");

// from (user) => { getRepositories(user.gitHubUsername,
// getCommits); } to
function getRepositories(user) {
  getRepositories(user.gitHubUsername, getCommits);
}

// from (repos) => { getCommits(repos, displayCommits); } to
// getCommits
function getCommits(repos) {
  getCommits(repos, displayCommits);
}

// from (commits) => { console.log("Commits", commits); } to
//  displayCommits
function displayCommits(commits) {
  console.log("Commits", commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    callback({ id: id, gitHubUsername: "Ela" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Getting the repositories...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
