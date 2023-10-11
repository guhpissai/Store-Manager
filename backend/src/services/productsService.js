const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) return { type: 404, data: { message: 'Product not found' } };
  return { type: 200, data: result };
};

const createProduct = async (data) => {
  const result = await productsModel.createProduct(data);
  return result;
};

const deleteProduct = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { type: 404, data: { message: 'Product not found' } };
  await productsModel.deleteProduct(id);
  return { type: 204, data: {} };
};

const updateProduct = async (name, id) => {
  const product = await productsModel.getById(id);
  if (!product) {
    return { type: 404, data: { message: 'Product not found' } };
  }
  const updatedProduct = await productsModel.updateProduct(name, id);
  return { type: 200, data: updatedProduct };
};

const searchProductByName = async (name) => {
  if (!name) {
    const allProducts = await productsModel.getAll();
    return { type: 200, data: allProducts };
  }
  const productWithName = await productsModel.searchProductByName(name);
  if (!productWithName.length) {
    return { type: 200, data: [] };
  }
  return { type: 200, data: productWithName };
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductByName,
};
