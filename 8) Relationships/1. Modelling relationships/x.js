// You can have a course document and this course has an
// author, but an author is more than just a name. You
// would have a collection of authors, where we store
// author documents, and in each author document, we can
// have properties like name, website, image, and so on.

// How to work with related objects..?
// Basically, we have two main approaches.

// 1. References (normalization)
// We have a separate collection for storing our authors.
let author1 = {
  name: "Ela",
};

let course1 = {
  // We set the author to the ID of an author document in
  // author's collection.

  // Even though we're setting the ID of an author here,
  // there's actually no association or no relationship
  // between these two documents in the database. In other
  // words, we can set this to an invalid ID and Mongo
  // doesn't care about that.
  author: "id",

  // Multiple authors in a course...
  // authors: ["id1", "id2", "id3"],
};

// 2. Embedded documents (denormalization)
// Instead of having a separate collection of authors, we
// can embed an author document inside of a course document.
let course2 = {
  author: {
    // Here we will have all the properties of an author.
    name: "Ela",
  },
};

// What to use among the 2?

// You need to do a trade-off between query performance
// versus consistency.

// First approach:
// > Single place to define or modify an author.
// > All courses that are referencing that author will
//   immediately see the updated author.
// > Consistency
// > However, every time you wanna query a course, we need
//   to do an extra query to load the related author.
//   Sometimes, that extra query may not be a big deal but
//   in certain situations, you want to make sure that your
//   queries run as fast as possible.

// Second approach:
// > Load the course object and its author using a single
//   query.
// > Performance
// > However, with this approach, if the name is updated,
//   chances are, there are multiple course documents that
//   need to be updated, and if our update operation does
//   not complete successfully, it's possible that we'll
//   have some course documents that are not updated. So
//   we'll end up with inconsistent data.

// Third approach:
// > Hybrid approach
// > For example, imagine each author has 50 properties. We
//   don't want to duplicate all those properties inside
//   every course in our database. So we can have a
//   separate collection of authors, but instead of using a
//   reference, we can embed an author document inside of a
//   course document, but not the complete representation
//   of that author. Perhaps we only want the name property.
let author2 = {
  name: "Kangkang",
  // 50 other properties...
};

let course3 = {
  author: {
    // Only has 2 properties...
    id: "ref",
    name: "Kangkang",
  },
};
