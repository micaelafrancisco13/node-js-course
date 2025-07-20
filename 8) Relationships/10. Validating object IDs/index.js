// Install a package called "joi-objectid"

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

function validateGenre(genre) {
  const schema = Joi.object({
    _id: Joi.objectId().min(2).required(),
  });

  return schema.validate(genre);
}
