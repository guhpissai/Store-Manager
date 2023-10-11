const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const result = await productsService.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, data } = await productsService.getById(id);
  console.log(data);
  return res.status(type).json(data);
};

const createProduct = async (req, res) => {
  const data = req.body;
  const result = await productsService.createProduct(data);
  return res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, data } = await productsService.updateProduct(name, id);
  return res.status(type).json(data);
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
};