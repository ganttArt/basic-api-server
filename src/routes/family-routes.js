'use strict';

const express = require('express');

const Family = require('../models/family.js');
const family = new Family();

const router = express.Router();

router.get('/family', getAllFamily);
router.get('/family/:id', getOneFamilyMember);
router.post('/family', createFamilyMember);
router.put('/family/:id', updateFamilyMember);
router.delete('/family/:id', deleteFamilyMember);

function getAllFamily(req, res) {
  let getFamily = family.read();
  res.status(200).json(getFamily);
}

function getOneFamilyMember(req, res) {
  const id = parseInt(req.params.id);
  let familyMember = family.read(id);
  res.status(200).json(familyMember);
}

function createFamilyMember(req, res) {
  let newFamilyMember = family.create(req.body);
  res.status(201).json(newFamilyMember);
}

function updateFamilyMember(req, res) {
  const id = parseInt(req.params.id);
  let familyMember = family.update(id, req.body);
  res.status(200).json(familyMember);
}

function deleteFamilyMember(req, res) {
  const id = parseInt(req.params.id);
  let newDB = family.delete(id);
  if (newDB === '404') {
    res.status(404).send('Family member with ID not in DB')
  } else {
    res.status(200).json(newDB);
  }  
}

module.exports = router;
