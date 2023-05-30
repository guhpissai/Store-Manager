const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection
  .execute(
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
  const [result] = await connection
  .execute(`SELECT 
  s.date,
  p.product_id AS productId, 
  p.quantity 
  FROM StoreManager.sales_products AS p 
  LEFT JOIN StoreManager.sales AS s 
  ON s.id = p.product_id
  WHERE sale_id = ?
  ORDER BY p.sale_id, productId`, [id]);
  return result;
};

module.exports = {
  getAll,
  getById,
};