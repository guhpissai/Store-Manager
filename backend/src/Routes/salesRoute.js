const { Router } = require('express');
const salesController = require('../controllers/salesController');
const {
  saleKeysValidation,
  quantityKeyValidation,
} = require('../middlewares/saleValidation');

const salesRouter = Router();

salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);
salesRouter.post('/', saleKeysValidation, salesController.createSaleProduct);
salesRouter.delete('/:id', salesController.deleteSale);
salesRouter.put(
  '/:saleId/products/:productId/quantity',
  quantityKeyValidation,
  salesController.updateSalesProducts,
);

module.exports = salesRouter;
