const { Router } = require('express');
const productsController = require('./controllers/productsController');
// const { validateId } = require('./middlewares/productsMiddleware');

const productsRouter = Router();
  
  productsRouter.get('/', productsController.getAll);
  productsRouter.get('/:id', productsController.getById);

module.exports = productsRouter;