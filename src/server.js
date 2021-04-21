'use strict';

const express = require('express');
const app = express();

app.use(express.json());

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Server running on Port: ${port}`);
    });
  }
}
