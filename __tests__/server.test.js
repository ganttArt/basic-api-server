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

  it('should create a new pet in the db', async () => {
    const response = await mockRequest.post('/pet').send({ name: 'Angel', species: 'dog' });
    expect(response.status).toBe(201);
    expect(response.body.record.name).toEqual('Angel');
    expect(response.body.record.species).toEqual('dog');
  });

  it('should retrieve a pet from the db', async () => {
    const response = await mockRequest.get('/pet/1');
    expect(response.status).toBe(200);
    expect(response.body.record.name).toEqual('Angel');
    expect(response.body.record.species).toEqual('dog');
  });

  it('should retrieve all pets from the db', async () => {
    await mockRequest.post('/pet').send({ name: 'Fuzzy', species: 'cat' });
    const response = await mockRequest.get('/pet');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(2);
    expect(response.body[1].id).toEqual(2);
    expect(response.body[1].record.name).toEqual('Fuzzy');
  });

});