const Joi = require("joi");

const eventSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  date: Joi.date().iso().required(),
  location: Joi.string().required(),
  club: Joi.string().required(),
});

module.exports = eventSchema;
