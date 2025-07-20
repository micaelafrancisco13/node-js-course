// So far, we have built these API endpoints.

// /api/genres
// /api/movies
// /api/customers
// /api/rentals

// Authentication is the process of identifying if the user
// is who they claim they are. That's when we log in. So we
// send our username and password to the server and the
// server authenticates us.

// Authorization is determining if the user has the right
// permission to perform the given operation.

// On our Vidly application, we want the following:
// 1. Only logged in users can perform operations that
//    modify data. So if the user is anonymous, if they're
//    not logged in, they can only read data from the
//    aforementioned endpoints.
// 2. Only admin users can delete data.

// To implement the 2 requirements above, we need to add 2
// new endpoints to our application.
// 1. Register users: POST /api/users
//    > Creating a new resource, in this case, a new user
// 1. Login a user: POST /api/users
//    > Creating a new resource, in this case, a new 
//      request/command
