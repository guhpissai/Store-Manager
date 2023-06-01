const saleValidation = require('./saleSchema');

const saleKeysValidation = (req, res, next) => {
  let errorMessage;
  const data = req.body;
  data.forEach((sale) => {
    const { error } = saleValidation.validate(sale);
    if (error) {
      errorMessage = error;
    }
  });
  if (errorMessage) {
    const statusRes = errorMessage.details[0].type === 'any.required' ? 400 : 422;
    return res.status(statusRes).json({ message: errorMessage.message });
  }
  next();
};

module.exports = saleKeysValidation;