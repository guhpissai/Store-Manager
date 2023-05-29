const validateId = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = (validateId);