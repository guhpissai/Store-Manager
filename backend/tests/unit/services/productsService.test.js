const chai = require('chai');
const sinon = require('sinon');
const products = require('../mocks/productsMock');
const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');

const { expect } = chai;

describe('Testes da camada Service dos produtos', function () {
  it('Deve retornar os dados corretamente', async function () {
    sinon.stub(productsModel, 'getAll').resolves(products);

    const result = await productsService.getAll();

    expect(result).to.be.deep.equal(products);
  });
});