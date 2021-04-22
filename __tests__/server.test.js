'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const mockRequest = supertest(server);

describe('Test Basic API Server', () => {

  it('should respond with a 404 on a bad route', async () => {
    return mockRequest.get('/badroute').then(data => {
      expect(data.status).toBe(404);
    });
  });

});