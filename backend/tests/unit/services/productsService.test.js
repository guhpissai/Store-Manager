const chai = require('chai');
const sinon = require('sinon');
const { products, data } = require('../mocks/productsMock');
const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');

const { expect } = chai;

describe('Testes da camada Service dos produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

it('Deve retornar os dados corretamente', async function () {
    sinon.stub(productsModel, 'getAll').resolves(products);

    const result = await productsService.getAll();

    expect(result).to.be.deep.equal(products);
  });

  it('Deve retornar os dados corretamente de acordo com o id', async function () {
    sinon.stub(productsModel, 'getById').resolves(products[0]);

    const result = await productsService.getById(1);

    expect(result).to.be.deep.equal({ type: 200, data: products[0] });
  });

  it('Nao deve ser possivel encontrar produtos inexistentes', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const result = await productsService.getById(999);

    expect(result).to.be.deep.equal({ type: 404, data: { message: 'Product not found' } });
  });

  it('Deve retornar os dados do produto criado', async function () {
    sinon.stub(productsModel, 'createProduct').resolves({ id: 4, name: 'Mark III' });

    const result = await productsService.createProduct(data);

    expect(result).to.be.deep.equal({ id: 4, name: 'Mark III' });
  });

  it('Should be possible to update a product', async function () {
    sinon.stub(productsModel, 'getById').resolves({ id: 1, name: 'Mark III' });
    sinon.stub(productsModel, 'updateProduct').resolves({ id: 1, name: 'Mark III' });
  
    const result = await productsService.updateProduct('Mark III', 1);

    expect(result).to.be.deep.equal({ type: 200, data: { id: 1, name: 'Mark III' } });
  });

  it('Should not be possible to update a product if the product does not exist', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);
  
    const result = await productsService.updateProduct('Mark III', 999);

    expect(result).to.be.deep.equal({ type: 404, data: { message: 'Product not found' } });
  });
});