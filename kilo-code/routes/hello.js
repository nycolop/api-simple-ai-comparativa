const helloController = require('../controllers/helloController');

const helloRoutes = (req, res, next) => {
  helloController.hello(req, res, next);
};

module.exports = helloRoutes;
