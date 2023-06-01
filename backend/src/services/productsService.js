const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) {
    return false;
  }
  return result;
};

const createProduct = async (data) => {
  const result = await productsModel.createProduct(data);
  return result;
};

module.exports = {
  getAll,
  getById,
  createProduct,
};