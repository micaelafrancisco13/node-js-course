// Sometimes we use dependencies that are only used during
// development. For example, we have tools for running unit
// tests, we have tools for doing static analysis on our
// code, you have tools from bundling or JavaScript code
// and so on.

// These dependencies are development dependencies, and
// they should not go in the production environment where
// we deploy our application.

// installing a development dependency...
// "npm i package_name --save-dev"

// All dependencies whether they're application dependencies 
// or development dependencies, they're stored inside of 
// the node_modules folder. They're only segregated in 
// package.json.