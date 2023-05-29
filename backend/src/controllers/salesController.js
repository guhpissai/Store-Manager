const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const result = await salesService.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getById(id);
  if (!result) res.status(404).json({ message: 'Product not found' });
  res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
};