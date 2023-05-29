const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const products = require('../mocks/productsMock');
const productsModel = require('../../../src/models/productsModel');

const { expect } = chai;

describe('Testando a model de products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar os dados corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(products);
  });

  it('Deve retornar o produto com o id correto', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productsModel.getById(1);

    expect(result).to.be.deep.equal(products[0]);
  });
});