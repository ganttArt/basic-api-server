'use strict';

class Pet {
  constructor() {
    this.id = 0;
    this.db = []
  }

  create(obj) {
    let record = {
      id: ++this.id,
      record: obj
    }
    this.db.push(record);
    return record
  }

  read(id) {
    if (id) {
      return this.db.find(record => record.id === id);
    } else {
      return this.db;
    }
  }

  update(id, obj) {
    if (id && obj) {
      let pet = this.db.find(record => record.id === id);
      Object.assign(pet.record, obj);
      return pet;
    }
  }

  delete(id) {
    if (id) {
      let index = this.db.findIndex(record => record.id === id);
      if (index === -1) {
        return '404';
      } 
      else {
        this.db.splice(index, 1);
        return this.db;
      }
    }
  }
}

module.exports = Pet;
