const getAll = (req, res) => {
  res.status(200).json({ message: 'ok!' });
};

module.exports = {
  getAll,
};