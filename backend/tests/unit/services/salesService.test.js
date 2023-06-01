const chai = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const productService = require('../../../src/services/productsService');
const { 
  idSalesMock, 
  allSalesMock, 
  productsMock, 
  serviceProductMock } = require('../mocks/salesMock');

const { expect } = chai;

describe('Testes da camada Service das sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar os dados corretamente', async function () {
    sinon.stub(salesModel, 'getAll').resolves(allSalesMock);

    const result = await salesService.getAll();

    expect(result).to.be.deep.equal(allSalesMock);
  });

  it('Deve retornar os dados corretamente de acordo com o id', async function () {
    sinon.stub(salesModel, 'getById').resolves(idSalesMock);

    const result = await salesService.getById(1);

    expect(result).to.be.deep.equal(idSalesMock);
  });

  it('Deve retornar falso se o id nao existir', async function () {
    sinon.stub(salesModel, 'getById').resolves(false);

    const result = await salesService.getById(999);

    expect(result).to.be.equal(false);
  });

  it('Deve ser possivel cadastrar uma nova venda', async function () {
    sinon.stub(productService, 'getById').resolves(true);
    sinon.stub(salesModel, 'createSaleId').resolves(1);
    sinon.stub(salesModel, 'createSaleProduct').resolves(productsMock);

    const result = await salesService.createSaleProduct([productsMock]);

    expect(result).to.be.deep.equal(serviceProductMock);
  });
});