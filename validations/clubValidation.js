const Joi = require("joi");

const clubSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string().required(),
  founded: Joi.date().iso().required(),
  president: Joi.string().required(),
});

module.exports = clubSchema;
