const helloService = require('../services/helloService');

const hello = (req, res, next) => {
  try {
    const { name } = req.query;
    const result = helloService.buildGreeting(name);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ message: result.message });
  } catch (err) {
    next(err);
  }
};

module.exports = { hello };
