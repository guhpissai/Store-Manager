const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { allSalesMock, idSalesMock } = require('../mocks/salesMock');
const salesModel = require('../../../src/models/salesModel');

const { expect } = chai;

describe('Testando a model de sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar a lista de sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesMock]);

    const result = await salesModel.getAll();

    expect(result).to.be.deep.equal(allSalesMock);
  });
  
  it('Deve retornar a sale referente ao id passado', async function () {
    sinon.stub(connection, 'execute').resolves([idSalesMock]);

    const result = await salesModel.getById(1);

    expect(result).to.be.deep.equal(idSalesMock);
  });
});