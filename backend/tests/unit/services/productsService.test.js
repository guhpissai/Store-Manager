const chai = require('chai');
const sinon = require('sinon');
const { products, data } = require('../mocks/productsMock');
const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');

const { expect } = chai;

describe('Testes da camada Service dos produtos', function () {
  it('Deve retornar os dados corretamente', async function () {
    sinon.stub(productsModel, 'getAll').resolves(products);

    const result = await productsService.getAll();

    expect(result).to.be.deep.equal(products);
  });

  it('Deve retornar os dados corretamente de acordo com o id', async function () {
    sinon.stub(productsModel, 'getById').resolves(products[0]);

    const result = await productsService.getById(1);

    expect(result).to.be.deep.equal(products[0]);
  });

  it('Deve retornar os dados do produto criado', async function () {
    sinon.stub(productsModel, 'createProduct').resolves({ id: 4, name: 'Mark III' });

    const result = await productsService.createProduct(data);

    expect(result).to.be.deep.equal({ id: 4, name: 'Mark III' });
  });
});