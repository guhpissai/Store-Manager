const Joi = require('joi');

const saleValidation = Joi.object({
  productId: Joi.number().min(1).required().label('productId'),
  quantity: Joi.number().min(1).required().label('quantity'),
}).messages({
  'string.empty': '{{#label}} is required',
  'number.min': '{{#label}} must be greater than or equal to 1',
});

module.exports = saleValidation;