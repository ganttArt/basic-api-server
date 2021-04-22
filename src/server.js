'use strict';

const express = require('express');
const app = express();

const petRoutes = require('./routes/pet-routes.js');
const notFound = require('./error-handlers/404.js');
const errors = require('./error-handlers/500.js');

app.use(express.json());

app.use(petRoutes);
app.use('*', notFound);
app.use(errors);

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Server running on Port: ${port}`);
    });
  }
}
