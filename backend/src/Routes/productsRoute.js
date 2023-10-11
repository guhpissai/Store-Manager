const { Router } = require('express');
const productsController = require('../controllers/productsController');
const { nameValidation } = require('../middlewares/productValidation');

const productsRouter = Router();
  
  productsRouter.get('/', productsController.getAll);
  productsRouter.get('/:id', productsController.getById);
  productsRouter.post('/', nameValidation, productsController.createProduct);
  productsRouter.put('/:id', nameValidation, productsController.updateProduct);
  productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;