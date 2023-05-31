const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const result = await salesService.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getById(id);
  if (!result) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(result);
};

const createSaleProduct = async (req, res) => {
  const data = req.body;
  const result = await salesService.createSaleProduct(data);
  return res.status(201).json(result);
};

module.exports = {
  getAll,
  getById,
  createSaleProduct,
};