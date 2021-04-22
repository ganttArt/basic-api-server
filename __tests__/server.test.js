'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const mockRequest = supertest(server);

describe('Test API pet routes', () => {
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

  it('should update a pet in the db', async () => {
    const response = await mockRequest.put('/pet/1').send({ name: 'Angel', species: 'cat' });
    const pet = await mockRequest.get('/pet/1');
    expect(response.status).toBe(200);
    expect(pet.body.record.species).toEqual('cat');
  });

  it('should not delete a pet if the id is not in the db', async() => {
    const response = await mockRequest.delete('/pet/100');
    expect(response.text).toEqual('Pet with ID not in DB');
  })

  it('should delete a pet in the db', async () => {
    const response = await mockRequest.delete('/pet/1');
    expect(response.body.length).toEqual(1);
    expect(response.body[0].id).toEqual(2);
  });
});

describe('Test API family routes', () => {
  it('should create a new family member in the db', async () => {
    const response = await mockRequest.post('/family').send({ name: 'test-spouse', relation: 'spouse' });
    expect(response.status).toBe(201);
    expect(response.body.record.name).toEqual('test-spouse');
    expect(response.body.record.relation).toEqual('spouse');
  });

  it('should retrieve a pet from the db', async () => {
    const response = await mockRequest.get('/family/1');
    expect(response.status).toBe(200);
    expect(response.body.record.name).toEqual('test-spouse');
    expect(response.body.record.relation).toEqual('spouse');
  });

  it('should retrieve all pets from the db', async () => {
    await mockRequest.post('/family').send({ name: 'test-father', relation: 'father' });
    const response = await mockRequest.get('/family');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(2);
    expect(response.body[1].id).toEqual(2);
    expect(response.body[1].record.name).toEqual('test-father');
  });

  it('should update a pet in the db', async () => {
    const response = await mockRequest.put('/family/1').send({ name: 'test-spouse', relation: 'partner' });
    const pet = await mockRequest.get('/family/1');
    expect(response.status).toBe(200);
    expect(pet.body.record.relation).toEqual('partner');
  });

  it('should not delete a pet if the id is not in the db', async() => {
    const response = await mockRequest.delete('/family/100');
    expect(response.text).toEqual('Family member with ID not in DB');
  })

  it('should delete a pet in the db', async () => {
    const response = await mockRequest.delete('/family/1');
    expect(response.body.length).toEqual(1);
    expect(response.body[0].id).toEqual(2);
  });
});

describe('Test API Error Handling', () => {
  it('should respond with a 404 on a bad route', async () => {
    return mockRequest.get('/badroute').then(data => {
      expect(data.status).toBe(404);
    });
  });

  it('should respond with a 404 on a bad method', async () => {
    const response = await mockRequest.put('/pet');
    expect(response.status).toBe(404);
  });
});