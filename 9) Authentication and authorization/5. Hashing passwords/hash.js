const bcrypt = require("bcrypt");

// To hash a password, we need a salt.
// For example, our password is "1234"
// Its hashed version, for example, is "abcd"

// Hackers can compile a list of popular passwords and hash
// them, and then they can look at the database of our
// application, they find this hash password and they know
// that "abcd" represents "1234". This is the reason why we
// need a salt.

// A "salt" is basically a random string that is added
// before or after a password, so the resulting hashed
// password will be different each time based on the salt
// that was used.
// bcrypt.genSalt(noOfRounds) - returns a promise
// noOfRounds - The higher the number, the longer it's
//              going to take to generate the salt, and
//              also, the salt will be more complex and
//              harder to break.
async function run() {
  const salt = await bcrypt.genSalt(10);
  const password = "1234";
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedPassword);
}

run();
