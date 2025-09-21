const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  content: Joi.string().min(10).required(),
  author: Joi.string().required(),
  club: Joi.string().required(),
});

module.exports = postSchema;
