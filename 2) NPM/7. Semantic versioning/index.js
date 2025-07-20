// In semantic versioning, the version of a node package 
// has three components (e.g,. 4.13. 6). The first number 
// is what we call the "major version". The second one is 
// what we call the "minor version" and the third one is 
// what we call the "patch version".

// Major - for adding new features that could potentially 
// break the existing applications that depend upon the 
// version of the said package

// Minor - for adding new features that don't break the 
// existing API

// Patch - for bug fixes

// ^ character tells NPM that we are interested in any 
// version of mongoose as long as the major version is 4. 
// So if there is a newer, minor, or patch version 
// available, you would be interested in that package as 
// well. If there is a newer version of mongoose available, 
// as long as it's version 4, so there are no breaking 
// changes, there are no major changes, then that newer 
// version will be downloaded and installed inside of the 
// node_modules folder.
// ^4.13.6 = 4.x

// ~1.8.3 has the alternative syntax of 1.8.x

// 1.8.3 - exact version