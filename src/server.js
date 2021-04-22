'use strict';

const express = require('express');
const app = express();

const petRoutes = require('./routes/pet-routes.js');
const notFound = require('./error-handlers/404.js');

app.use(express.json());

app.use(petRoutes);
app.use('*', notFound);

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Server running on Port: ${port}`);
    });
  }
}
