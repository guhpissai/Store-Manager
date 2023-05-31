const allSalesMock = [
  {
    saleId: 1,
    date: '2023-05-29T21:36:06.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-29T21:36:06.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: null,
    productId: 3,
    quantity: 15,
  },
];

const idSalesMock = [
  {
    saleId: 1,
    date: '2023-05-29T21:36:06.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-29T21:36:06.000Z',
    productId: 2,
    quantity: 10,
  },
];

const productsMock = { productId: 1, quantity: 5 };

const serviceProductMock = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 5,
    },
  ],
};

module.exports = {
  allSalesMock,
  idSalesMock,
  productsMock,
  serviceProductMock,
};