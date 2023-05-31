const Joi = require('joi');

const productValidation = Joi.object({
  name: Joi.string().min(5).required().label('name'),
}).messages({
  'string.empty': '{{#label}} is required',
  'string.min': '{{#label}} length must be at least 5 characters long',
});

module.exports = productValidation;