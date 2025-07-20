// In some relational databases like SQL Server or MySQL,
// we have the concept of "transaction", which basically
// means a group of operations that should be performed as
// a unit. So either all these operations will complete and
// change the state of the database, or if something fails
// in the middle, all these operations that have been
// applied will be rolled back and our database will go
// back in the initial state.

// 2 operations - either both will complete or both will
//                rollback

// Now in MongoDB, we don't have transactions as we have in
// these relational databases. We have a technique called
// "two phase commit".

// Install the Fawn library that implements transaction
// using the two-phase commit technique.
// npm i fawn

// Loading...
const Fawn = require("fawn");

// Initializing...
Fawn.init("mongodb://localhost/dbName");

// Now, it's possible that something fails during this
// transaction, so we need to wrap this in a try-catch
// block.
try {
  // Here, we can add one or more operations and all these
  // operations together will be treated as a unit.
  // "rentals" - actual collection's name
  new Fawn.Task()
    // pass the new rental object to be saved
    .save("rentals", rental)

    // pass the id to be updated and the operation to be
    // done
    .update(
      "movies",
      { _id: movie._id },
      {
        $inc: { numberInStock: -1 },
      }
    )
    .run();

  res.send(rental);
} catch (ex) {
  // 500 error - internal server error
  res.status(500).send("Something failed...");
}
