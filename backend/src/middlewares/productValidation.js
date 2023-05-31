const productValidation = require('./productSchema');

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  const { error } = productValidation.validate({ name });
  if (error) {
    const status = error.details[0].type === 'any.required' ? 400 : 422;
    return res.status(status).json({ message: error.message });
  }
  next();
};

module.exports = { nameValidation };