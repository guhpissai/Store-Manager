const { Router } = require('express');
const productsSalesController = require('../controllers/productsController');

const productsRouter = Router();
  
  productsRouter.put('/:id', productsSalesController.updateProduct);

module.exports = productsRouter;