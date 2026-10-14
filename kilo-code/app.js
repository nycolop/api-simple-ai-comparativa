const express = require('express');
const app = express();
const helloRoutes = require('./routes/hello');

app.use(express.json());
app.use('/hello', helloRoutes);

module.exports = app;
