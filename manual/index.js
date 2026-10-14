const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  const { name } = req.query;

  if (!name) return res.sendStatus(400);

  res.json({ message: `Hello, ${name}` });
});

app.listen(3000);

module.exports = app;
