'use strict';

const express = require('express');
const app = express();

const familyRoutes = require('./routes/family-routes.js');
const petRoutes = require('./routes/pet-routes.js');
const notFound = require('./error-handlers/404.js');

app.use(express.json());

app.use(familyRoutes);
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
