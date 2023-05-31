const salesModel = require('../models/salesModel');

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (result.length === 0) {
    return false;
  }
  return result;
};

const createSaleProduct = async (data) => {
  const id = await salesModel.createSaleId();
  const salesPromisse = data.map((sale) => salesModel.createSaleProduct(sale, id));
  const result = await Promise.all(salesPromisse);
  console.log({
    id,
    itemsSold: result,
  });
  return {
    id,
    itemsSold: result,
  };
};

module.exports = {
  getAll,
  getById,
  createSaleProduct,
};