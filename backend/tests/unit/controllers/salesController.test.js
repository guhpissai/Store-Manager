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
  const sendSpy = sinon.spy();
  const req = {};
  const res = {
    send: sendSpy,
  };

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  afterEach(function () {
    sinon.restore();
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
    const service = sinon
      .stub(salesService, 'createSaleProduct')
      .resolves(serviceProductMock);

    await salesController.createSaleProduct(req, res);

    expect(service).to.be.calledWith(productsMock);
    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(serviceProductMock);
  });

  it('Deve retornar status 404 ao cadastrar uma nova venda', async function () {
    req.body = [];
    const service = sinon
      .stub(salesService, 'createSaleProduct')
      .resolves(false);

    await salesController.createSaleProduct(req, res);

    expect(service).to.be.calledWith([]);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Product not found' });
  });

  it('Deve retornar status 204 ao deletar uma venda', async function () {
    req.params = { id: 1 };

    const service = sinon
    .stub(salesService, 'deleteSale')
    .resolves(1);

    await salesController.deleteSale(req, res);

    expect(service).to.be.calledWith(1);
    expect(res.status).to.be.calledWith(200);
  });

  it('Deve retornar status 404 ao tentar deletar uma venda inexistente', async function () {
    req.params = { id: 999 };

    const service = sinon
    .stub(salesService, 'deleteSale')
    .resolves(0);

    await salesController.deleteSale(req, res);

    expect(service).to.be.calledWith(999);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Sale not found' });
  });
});
