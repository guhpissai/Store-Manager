const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const products = require('./mocks/productMock');
const productsModel = require('../../../src/models/productsModel');

const { expect } = chai;

describe('Testando a model de products', function () {
  it('Deve retornar os dados corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(products);
  });
});