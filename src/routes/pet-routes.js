'use strict';

const express = require('express');

const Pet = require('../models/pet.js');
const pet = new Pet();

const router = express.Router();

router.get('/pet', getAllPets);
router.get('/pet/:id', getOnePet);
router.post('/pet', createPet);
router.put('/pet/:id', updatePet);
router.delete('/pet/:id', deletePet);

function getAllPets(req, res) {
  let getPets = pet.read();
  res.status(200).json(getPets);
}

function getOnePet(req, res) {
  const id = parseInt(req.params.id);
  let thisPet = pet.read(id);
  res.status(200).json(thisPet);
}

function createPet(req, res) {
  let newPet = pet.create(req.body);
  res.status(201).json(newPet);
}

function updatePet(req, res) {
  const id = parseInt(req.params.id);
  let thisPet = pet.update(id, req.body);
  res.status(200).json(thisPet);
}

function deletePet(req, res) {
  const id = parseInt(req.params.id);
  let newDB = pet.delete(id);
  if (newDB === '404') {
    res.status(404).send('Pet with ID not in DB')
  } else {
    res.status(200).json(newDB);
  }  
}

module.exports = router;
