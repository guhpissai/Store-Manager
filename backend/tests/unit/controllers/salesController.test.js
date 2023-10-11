const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesController = require('../../../src/controllers/salesController');
const salesService = require('../../../src/services/salesService');
const {
  idSalesMock,
  allSalesMock,
  productsMock,
  serviceProductMock,
} = require('../mocks/salesMock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando a camada Controller da coluna sales', function () {
  const req = {};
  const res = {};

  beforeEach(function () {
    sinon.restore();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  it('Deve listar todas as sales', async function () {
    const service = sinon.stub(salesService, 'getAll').resolves(allSalesMock);

    await salesController.getAll(req, res);

    expect(service).to.be.calledWith();
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(allSalesMock);
  });

  it('Deve retornar status 200 caso exista um produto com o id passado', async function () {
    req.params = { id: 1 };
    const service = sinon.stub(salesService, 'getById').resolves(idSalesMock);

    await salesController.getById(req, res);

    expect(service).to.be.calledWith(1);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(idSalesMock);
  });

  it('Deve retornar status 404 caso nao exista um produto com o id passado', async function () {
    req.params = { id: 999 };

    const service = sinon.stub(salesService, 'getById').resolves(false);

    await salesController.getById(req, res);

    expect(service).to.be.calledWith(999);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Sale not found' });
  });

  it('Deve retornar status 201 ao cadastrar uma nova venda', async function () {
    req.body = productsMock;

    sinon
      .stub(salesService, 'createSaleProduct')
      .resolves({ type: 201, data: serviceProductMock });

    await salesController.createSaleProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(serviceProductMock);
  });

  it('Deve retornar status 404 caso nao seja possivel cadastrar uma venda', async function () {
    req.body = { productId: 999, quantity: 5 };

    sinon
      .stub(salesService, 'createSaleProduct')
      .resolves({ type: 404, data: { message: 'Product not found' } });

    await salesController.createSaleProduct(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Product not found' });
  });

  it('Deve retornar status 204 ao deletar uma venda', async function () {
    req.params = { id: 1 };

    sinon
      .stub(salesService, 'deleteSale')
      .resolves({ type: 200, data: {} });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Deve retornar status 404 ao tentar deletar uma venda inexistente', async function () {
    req.params = { id: 999 };

    sinon
      .stub(salesService, 'deleteSale')
      .resolves({ type: 404, data: { message: 'Sale not found' } });

    await salesController.deleteSale(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
});
