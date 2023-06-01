const chai = require('chai');
const sinon = require('sinon');
const productValidation = require('../../../src/middlewares/productValidation');

const { expect } = chai;

describe('Testando os middlewares', function () {
  const req = {};
  const res = {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  it('Deve retornar status 400 quando o name for indefinido', async function () {
    req.body = {};

    const next = sinon.stub().returns();

    await productValidation.nameValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
  });

  it('Deve retornar status 422 quando o name ter menos que 5 caracteres', async function () {
    req.body = { name: 'x' };

    const next = sinon.stub().returns();

    await productValidation.nameValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
  });

  it('Deve ter sucesso ao passar o name corretamente', async function () {
    req.body = { name: 'Mark V' };

    const next = sinon.stub().returns();

    await productValidation.nameValidation(req, res, next);

    expect(next).to.have.been.calledWith();
  });
});