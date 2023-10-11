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
  const res = { end: sinon.stub() };

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub();
  });

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
    sinon
      .stub(productsService, 'getById')
      .resolves({ type: 200, data: products[0] });

    await productsController.getById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(products[0]);
  });

  it('Deve retornar status 404 caso nao exista um produto com o id passado', async function () {
    req.params = { id: 999 };

    sinon
      .stub(productsService, 'getById')
      .resolves({ type: 404, data: { message: 'Product not found' } });

    await productsController.getById(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.have.been.calledWithExactly({
      message: 'Product not found',
    });
  });

  it('deve retornar status 201 quando obter sucesso ao criar um produto', async function () {
    req.body = { name: 'Mark III' };
    sinon
      .stub(productsService, 'createProduct')
      .resolves({ id: 4, name: 'Mark III' });

    await productsController.createProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith({ id: 4, name: 'Mark III' });
  });

  it('Deve ser possivel atualizar um produto', async function () {
    req.params = { id: 1 };
    req.body = { name: 'Mark III' };

    const result = sinon.stub(productsService, 'updateProduct')
      .resolves({ type: 200, data: { id: 1, name: 'Mark III' } });

    await productsController.updateProduct(req, res);

    expect(result).to.be.calledWith('Mark III', 1);
    expect(res.status).to.be.calledWith(200);
  });

  it('Nao deve ser possivel atualizar um produto caso o produto nao exista', async function () {
    req.params = { id: 999 };
    req.body = { name: 'Mark III' };
    sinon.stub(productsService, 'updateProduct')
      .resolves({ type: 404, data: { message: 'Product not found' } });

    await productsController.updateProduct(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Product not found' });
  });

  it('Deve ser possivel deletar um produto caso ele exista', async function () {
    req.params = { id: 1 };
    
    sinon.stub(productsService, 'deleteProduct').resolves({ type: 204, data: {} });

    await productsController.deleteProduct(req, res);

    expect(res.status).to.be.calledWith(204);
    expect(res.json).to.be.calledWith({});
  });
});
