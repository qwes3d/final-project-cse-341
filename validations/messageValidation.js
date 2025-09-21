const Joi = require ( "joi");

const messageSchema = Joi.object({
  recipient: Joi.string().required(), // userId of the recipient
  content: Joi.string().min(1).max(1000).required(),
});

module.exports = messageSchema;
