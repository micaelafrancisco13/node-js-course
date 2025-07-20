const authorization = require("../middleware/authorization");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  // Let's say that tomorrow we decide to change the message
  // or the log exception that we send to the client, with
  // the current implementation, we have to go to every 
  // route handler where we have used this try-catch block 
  // and modify that message or log exception.
  try {
    const genres = await Genre.find().sort("name");
    res.send(genres);
  } catch (exception) {
    // We want to move this logic for handling errors to
    // somewhere central. So if in the future, we want to
    // make a change in how we handle errors, there is a
    // single place we need to modify.
    // res.status(500).send("Something failed in the server.");
    next(exception); 
  }
});

router.post("/", authorization, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

// These 2 middleware functions will be executed in
// sequence.
router.delete("/:id", [authorization, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;
