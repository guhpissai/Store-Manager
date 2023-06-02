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

const updateProduct = async (name, id) => {
  const idExist = await getById(id);
  if (!idExist) {
    return false;
  }
  const result = await productsModel.updateProduct(name, id);
  return result;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
};