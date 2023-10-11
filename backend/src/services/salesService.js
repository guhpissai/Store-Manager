const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (!result.length) {
    return null;
  }
  return result;
};

const createSaleProduct = async (data) => {
  let isTrue = true;
  const productPromisse = await data.map((sale) =>
    productsService.getById(sale.productId));
  const promisseResult = await Promise.all(productPromisse);
  promisseResult.forEach((id) => {
    if (id === false) {
      isTrue = false;
    }
  });
  if (!isTrue) return false;
  const id = await salesModel.createSaleId();
  const salesPromisse = await data.map((sale) =>
    salesModel.createSaleProduct(sale, id));
  const result = await Promise.all(salesPromisse);
  return {
    id,
    itemsSold: result,
  };
};

const deleteSale = async (id) => {
  const sale = await salesModel.getById(id);
  if (sale.length) {
    await salesModel.deleteSale(id);
    return { type: 204, data: {} };
  }
  return { type: 404, data: { message: 'Sale not found' } };
};

module.exports = {
  getAll,
  getById,
  createSaleProduct,
  deleteSale,
};
