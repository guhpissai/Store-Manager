const { Router } = require('express');
const salesController = require('../controllers/salesController');
const saleKeysValidation = require('../middlewares/saleValidation');

const salesRouter = Router(); 

  salesRouter.get('/', salesController.getAll);
  salesRouter.get('/:id', salesController.getById);
  salesRouter.post('/', saleKeysValidation, salesController.createSaleProduct);

module.exports = salesRouter;
