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
  let productNotExist = false;
  const productPromisse = await data.map((sale) =>
    productsService.getById(sale.productId));
  const promisseResult = await Promise.all(productPromisse);
  promisseResult.forEach((product) => {
    if (product.type === 404) productNotExist = true;
  });
  if (productNotExist) return { type: 404, data: { message: 'Product not found' } };
  const id = await salesModel.createSaleId();
  const salesPromisse = await data.map((sale) =>
    salesModel.createSaleProduct(sale, id));
  const result = await Promise.all(salesPromisse);
  return { type: 201, data: { id, itemsSold: result } };
};

const deleteSale = async (id) => {
  const sale = await salesModel.getById(id);
  if (sale.length) {
    await salesModel.deleteSale(id);
    return { type: 204, data: {} };
  }
  return { type: 404, data: { message: 'Sale not found' } };
};

const updateSalesProducts = async (saleId, productId, quantity) => {
  const sale = await salesModel.getById(saleId);
  if (!sale.length) return { type: 404, data: { message: 'Sale not found' } };

  const product = await salesModel.getProductInSale(saleId, productId);
  if (!product) {
    return { type: 404, data: { message: 'Product not found in sale' } };
  }

  const data = await salesModel.updateSalesProducts(
    saleId,
    productId,
    quantity,
  );
  return { type: 200, data };
};

module.exports = {
  getAll,
  getById,
  createSaleProduct,
  deleteSale,
  updateSalesProducts,
};
