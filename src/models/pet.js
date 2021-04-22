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
    // update an item in the "db" with a new item
    // PLACEHOLDER
    if (id) {
      return obj;
    }
  }

  delete(id) {
    // find an item in the "db" via it's id, and delete
    // PLACEHOLDER
    if (id) {
      return null;
    }
  }
}

module.exports = Pet;
