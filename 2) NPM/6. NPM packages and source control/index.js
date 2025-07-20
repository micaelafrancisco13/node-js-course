// When checking your source code into a source control 
// repository, you don't want to include the node_modules 
// folder. Because every time someone checks out your code 
// from the repository, they have to wait for hundreds of 
// megabytes of data to be downloaded. The same is true if 
// you want to copy the source code from one machine to 
// another, let's say, you wanna give this to your friend 
// by email or by a Dropbox, you don't want to send all the 
// content of the node_modules folder.

// All our dependencies are stored here in package.json 
// file.

// We can restore all these dependencies by running "npm i". 
// So NPM looks at our package.json, and then it will 
// download those dependencies from NPM registry.

// How to exclude node_modules folder from Git?
// Go to .gitignore
