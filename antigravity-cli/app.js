const express = require('express');
const helloRoutes = require('./routes/hello.routes');

const app = express();

app.use(express.json());
app.use('/', helloRoutes);

module.exports = app;
