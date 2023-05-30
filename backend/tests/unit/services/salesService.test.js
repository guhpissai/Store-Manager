const chai = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const { idSalesMock, allSalesMock } = require('../mocks/salesMock');

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

    expect(result).to.be.deep.equal(false);
  });
});