const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesController = require('../../../src/controllers/salesController');
const salesService = require('../../../src/services/salesService');
const { 
  idSalesMock, 
  allSalesMock, 
  productsMock, 
  serviceProductMock } = require('../mocks/salesMock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando a camada Controller da coluna sales', function () {
  const req = {};
  const res = {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  afterEach(function () {
    sinon.restore();
  });

  it('Deve listar todas as sales', async function () {
    sinon.stub(salesService, 'getAll').resolves(allSalesMock);

    await salesController.getAll(req, res);

    expect(res.status).to.be.calledWith(200);
  });

  it('Deve retornar status 200 caso exista um produto com o id passado', async function () {
    req.params = { id: 1 };
    sinon.stub(salesService, 'getById').resolves(idSalesMock);

    await salesController.getById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(idSalesMock);
  });

  it('Deve retornar status 404 caso nao exista um produto com o id passado', async function () {
    req.params = { id: 999 };
    sinon.stub(salesService, 'getById').resolves(false);

    await salesController.getById(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Sale not found' });
  });

  it('Deve retornar status 201 ao cadastrar uma nova venda', async function () {
    req.body = productsMock;
    sinon.stub(salesService, 'createSaleProduct').resolves(serviceProductMock);

    await salesController.createSaleProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(serviceProductMock);
  });

  it('Deve retornar status 404 ao cadastrar uma nova venda', async function () {
    req.body = [];
    sinon.stub(salesService, 'createSaleProduct').resolves(false);

    await salesController.createSaleProduct(req, res);

    expect(res.status).to.be.calledWith(404);
  });
});