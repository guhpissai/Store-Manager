const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { products } = require('../mocks/productsMock');
const productsController = require('../../../src/controllers/productsController');
const productsService = require('../../../src/services/productsService');

chai.use(sinonChai);
const { expect } = chai;

describe('Testes da camada Controller dos produtos', function () {
  const req = {};
  const res = {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar status 200', async function () {
    sinon.stub(productsService, 'getAll').resolves(products);

    await productsController.getAll(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(products);
  });

  it('Deve retornar status 200 caso exista um produto com o id passado', async function () {
    req.params = { id: 1 };
    const getId = sinon.stub(productsService, 'getById').resolves(products[0]);

    await productsController.getById(req, res);

    expect(getId).to.be.calledWith(1);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(products[0]);
  });

  it('Deve retornar status 404 caso nao exista um produto com o id passado', async function () {
    req.params = { id: 999 };
    const getId = sinon.stub(productsService, 'getById').resolves(false);

    await productsController.getById(req, res);

    expect(getId).to.be.calledWith(999);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Product not found' });
  });

  it('deve retornar status 201 quando obter sucesso ao criar um produto', async function () {
    req.body = { name: 'Mark III' };
    sinon.stub(productsService, 'createProduct').resolves({ id: 4, name: 'Mark III' });

    await productsController.createProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith({ id: 4, name: 'Mark III' });
  });
});