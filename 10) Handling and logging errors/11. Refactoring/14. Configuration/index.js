const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/configurations")();
require("./startup/database")();
require("./startup/routes")(app);

process.env.PORT = 4000;
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
