const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("student", "admin", "faculty").required(),
});

module.exports = userSchema;
