const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const result = await productsService.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getById(id);
  return !result ? res.status(404).json({ message: 'Product not found' }) 
  : res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const data = req.body;
  const result = await productsService.createProduct(data);
  return res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productsService.updateProduct(name, id);
  if (!result) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(result);
};

// const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   await productsService.deleteProduct(id);
//   return res.status(204);
// };

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  // deleteProduct,
};