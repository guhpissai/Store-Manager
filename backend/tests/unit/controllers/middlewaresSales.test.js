const chai = require('chai');
const sinon = require('sinon');
const {
  saleKeysValidation,
  quantityKeyValidation,
} = require('../../../src/middlewares/saleValidation');

const { expect } = chai;

describe('Testando os middlewares da sale', function () {
  const req = {};
  const res = {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.restore();
  });

  it('Deve retornar status 400 quando o productId for indefinido', async function () {
    req.body = [{ quantity: 1 }];

    const next = sinon.stub().returns();

    await saleKeysValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"productId" is required',
    });
  });

  it('Deve retornar status 400 quando o quantity for indefinido', async function () {
    req.body = [{ productId: 1 }];

    const next = sinon.stub().returns();

    await saleKeysValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"quantity" is required',
    });
  });

  it('Deve retornar status 422 quando o quantity for menor que 1', async function () {
    req.body = [{ productId: 1, quantity: 0 }];

    const next = sinon.stub().returns();

    await saleKeysValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({
      message: '"quantity" must be greater than or equal to 1',
    });
  });

  it('Deve ter sucesso ao passar os dados corretamente', async function () {
    req.body = [{ productId: 1, quantity: 1 }];

    const next = sinon.stub().returns();

    await saleKeysValidation(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Deve atualizar os dados', async function () {
    req.body = { quantity: 20 };

    const next = sinon.stub().returns();

    await quantityKeyValidation(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Não deve ser possivel fazer a requisição com o campo "quantity" vazio', async function () {
    req.body = {};

    const next = sinon.stub().returns();

    await quantityKeyValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"quantity" is required',
    });
  });

  it('Não deve ser possivel fazer a requisição com o quantity menor que 1', async function () {
    req.body = { quantity: 0 };

    const next = sinon.stub().returns();

    await quantityKeyValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({
      message: '"quantity" must be greater than or equal to 1',
    });
  });
});
