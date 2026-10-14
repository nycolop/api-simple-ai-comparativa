const helloService = require('../services/hello.service');

const getHello = (req, res) => {
  const { name } = req.query;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: "El parámetro 'name' es requerido" });
  }

  const message = helloService.getGreeting(name);
  return res.status(200).json({ message });
};

module.exports = {
  getHello,
};
