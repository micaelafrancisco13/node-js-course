// We only installed mongoose and lodash. So these other 
// libraries you see in node_modules, they are other node 
// packages that mongoose is dependent upon.

// All dependencies of our application as well as their 
// dependencies are stored under or node module folder.
// There is an exception here. If one of these packages 
// uses a different version of one of these dependencies, 
// then that version would be stored locally with that 
// package.


// Example:
// App dependency -> async_v.1 
// -- (stored within node_modules)
// node_modules --> async_v.1

// Mongoose dependency -> async_v.2
// -- (stored within node_modules under mongoose folder)
// mongoose --> node_modules --> async_v.2