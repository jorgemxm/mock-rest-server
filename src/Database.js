class Database {
  constructor () {
    this.db = {}
    this.autoIncrement = {}
  }

  create (collection, item) {
    if (this.autoIncrement[collection] === undefined) {
      this.db[collection] = {}
      this.autoIncrement[collection] = 1
    }
    item.id = this.autoIncrement[collection]++
    this.db[collection][item.id] = item
    return this.db[collection][item.id]
  }

  read (collection, id) {
    // No collection found
    if (this.db[collection] === undefined) {
      return {}

    // List collection
    } else if (isNaN(id)) {
      return Object.values(this.db[collection])

    // Get item in collection
    } else if (this.db[collection][id] !== undefined) {
      return this.db[collection][id]
    }

    // item not found
    return {}
  }

  replace (collection, item) {
    if (this.autoIncrement[collection] === undefined) {
      this.db[collection] = {}
      this.autoIncrement[collection] = 1
    }
    this.db[collection][item.id] = item
    return this.db[collection][item.id]
  }

  update (collection, item) {
    if (this.autoIncrement[collection] === undefined) {
      this.db[collection] = {}
      this.autoIncrement[collection] = 1
    }
    this.db[collection][item.id] = this.db[collection][item.id] || {}
    for (const key in item) {
      this.db[collection][item.id][key] = item[key]
    }
    return this.db[collection][item.id]
  }

  delete (collection, id) {
    if (this.db[collection] !== undefined) {
      if (isNaN(id)) {
        delete this.db[collection]
      } else {
        delete this.db[collection][id]
      }
    }
    return {}
  }
}

module.exports = Database
