const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getById = async (id) => {
  const [[result]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id', [id]);
  return result;
};

const createProduct = async (data) => {
  const { name } = data;
  const [{ insertId }] = await connection
  .execute('INSERT INTO StoreManager.products (name) VALUES(?)', [name]);
  const result = {
    id: insertId,
    name,
  };
return result;
};

const updateProduct = async (name, id) => {
  const result = await connection
  .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id]);
  console.log(result);
  return {
    id,
    name,
  };
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
};