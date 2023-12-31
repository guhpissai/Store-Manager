const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT 
    p.sale_id AS saleId, 
    s.date,
    p.product_id AS productId,
    p.quantity 
    FROM StoreManager.sales_products AS p 
    LEFT JOIN StoreManager.sales AS s 
    ON s.id = p.product_id ORDER BY saleId, productId`,
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
  s.date,
  p.product_id AS productId, 
  p.quantity 
  FROM StoreManager.sales_products AS p 
  LEFT JOIN StoreManager.sales AS s 
  ON s.id = p.product_id
  WHERE sale_id = ?
  ORDER BY p.sale_id, productId`,
    [id],
  );
  return result;
};

const createSaleId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ();',
  );
  return insertId;
};

const createSaleProduct = async (sale, id) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [id, sale.productId, sale.quantity],
  );
  return {
    productId: sale.productId,
    quantity: sale.quantity,
  };
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return affectedRows;
};

const getProductInSale = async (saleId, productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE product_id = ? AND sale_id = ?',
    [productId, saleId],
  );
  return result;
};

const updateSalesProducts = async (saleId, productId, quantity) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
  );
  if (affectedRows > 0) {
    return {
      date: new Date().toISOString(),
      productId: +productId,
      saleId: +saleId,
      quantity,
    };
  }
  return null;
};

module.exports = {
  getAll,
  getById,
  createSaleId,
  createSaleProduct,
  deleteSale,
  updateSalesProducts,
  getProductInSale,
};
