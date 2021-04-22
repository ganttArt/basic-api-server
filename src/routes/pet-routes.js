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

}

function deletePet(req, res) {

}

module.exports = router;
