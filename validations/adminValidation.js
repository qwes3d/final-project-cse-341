const Joi = require ( "joi");

const adminSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("superadmin", "admin").default("admin"),
});

module.exports = adminSchema;
