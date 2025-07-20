const _ = require("lodash");

// This is how the require() works. When you supply the
// module name, first, it assumes that this module is a
// core module. Now, in Node, we don't have a core module
// called lodash. Second, it assumes that this module is a
// file or folder. Next, the require() moves on to the third
// step, it assumes that this module we have specified here
// exists inside the node_modules folder.

// Summary:
// 1. core module
// 2. file/folder
// 3. node_modules
const result = _.includes([1, 2, 3], 2);
console.log(result);
