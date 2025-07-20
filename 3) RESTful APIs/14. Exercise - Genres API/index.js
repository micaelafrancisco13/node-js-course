const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "Genre 1" },
  { id: 2, name: "Genre 2" },
  { id: 3, name: "Genre 3" },
  { id: 4, name: "Genre 4" },
  { id: 5, name: "Genre 5" },
];

app.get("/", (req, res) => {
  res.send("Genres API");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genreId = req.params.id;
  const genre = genres.find((c) => c.id === parseInt(genreId));
  if (!genre)
    return res
      .status(404)
      .send(`The genre with the id of ${genreId} was not found.`);
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);

  if (!error) {
    const genre = { id: genres.length + 1, name: req.body.name };
    genres.push(genre);
    res.send(genre);
  } else {
    const errorMessage = error.details[0].message;
    return res.status(404).send(errorMessage);
  }
});

app.put("/api/genres/:id", (req, res) => {
  const genreId = req.params.id;
  const genre = genres.find((c) => c.id === parseInt(genreId));
  if (!genre)
    return res
      .status(404)
      .send(`The genre with the id of ${genreId} was not found.`);

  const { error } = validateGenre(req.body);
  if (!error) {
    genre.name = req.body.name;
    res.send(genre);
  } else {
    const errorMessage = error.details[0].message;
    return res.status(404).send(errorMessage);
  }
});

app.delete("/api/genres/:id", (req, res) => {
  const genreId = req.params.id;
  const genre = genres.find((c) => c.id === parseInt(genreId));
  if (!genre)
    return res
      .status(404)
      .send(`The genre with the id of ${genreId} was not found.`);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

process.env.PORT = 5000;
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
