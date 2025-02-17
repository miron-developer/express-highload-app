const Joi = require("joi");

const balanceSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  amount: Joi.number().integer().required(),
});

module.exports = balanceSchema;
