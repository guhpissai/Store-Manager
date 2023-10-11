const chai = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const productService = require('../../../src/services/productsService');
const {
  idSalesMock,
  allSalesMock,
  productsMock,
  serviceProductMock,
} = require('../mocks/salesMock');

const { expect } = chai;

describe('Testes da camada Service das sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar os dados corretamente', async function () {
    const model = sinon.stub(salesModel, 'getAll').resolves(allSalesMock);

    const result = await salesService.getAll();

    expect(model).to.be.calledWith();
    expect(result).to.be.deep.equal(allSalesMock);
  });

  it('Deve retornar os dados corretamente de acordo com o id', async function () {
    sinon.stub(salesModel, 'getById').resolves(idSalesMock);

    const result = await salesService.getById(1);

    expect(result).to.be.deep.equal(idSalesMock);
  });

  it('Deve retornar falso se o id nao existir', async function () {
    const model = sinon.stub(salesModel, 'getById').resolves(0);

    const result = await salesService.getById(999);

    expect(model).to.be.calledWith(999);
    expect(result).to.be.equal(null);
  });

  it('Deve ser possivel cadastrar uma nova venda', async function () {
    sinon.stub(productService, 'getById').resolves(true);
    sinon.stub(salesModel, 'createSaleId').resolves(1);
    sinon.stub(salesModel, 'createSaleProduct').resolves(productsMock);

    const result = await salesService.createSaleProduct([productsMock]);

    expect(result).to.be.deep.equal(serviceProductMock);
  });

  it('Nao deve ser possivel cadastrar uma nova venda se o id nao existir', async function () {
    sinon.stub(productService, 'getById').resolves(false);
    sinon.stub(salesModel, 'createSaleId').resolves(undefined);
    sinon.stub(salesModel, 'createSaleProduct').resolves(productsMock);

    const result = await salesService.createSaleProduct([
      {
        productId: 999,
        quantity: 1,
      },
    ]);

    expect(result).to.be.deep.equal(false);
  });

  it('Deve ser possivel deletar uma venda se ela existir', async function () {
    sinon.stub(salesModel, 'getById').resolves(idSalesMock);
    sinon.stub(salesModel, 'deleteSale').resolves(1);

    const response = await salesService.deleteSale(1);

    expect(response).to.be.deep.equal({ type: 204, data: {} });
  });

  it('Nao deve ser possivel deletar uma venda inexistente', async function () {
    sinon.stub(salesModel, 'getById').resolves([]);

    const response = await salesService.deleteSale(999);

    expect(response).to.be.deep.equal({ type: 404, data: { message: 'Sale not found' } });
  });
});
