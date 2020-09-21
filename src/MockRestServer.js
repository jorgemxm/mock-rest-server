const http = require('http')
const Database = require('./Database')
const Randomizer = require('./Randomizer')

class MockRestServer {
  constructor (port, silent, latency) {
    this.port = port || 3000
    this.silent = silent || false
    this.latency = latency || 0
    this.db = new Database()
    this.trace('Mock Rest Server:')
    this.trace('Open a new shell and run some curl on api /v1/:')
    this.trace(`  → curl -X POST -d '{"title":"Awesome news!","body":"Some content."}' http://localhost:${this.port}/v1/articles\n`)
    this.trace('Now, get your articles with:')
    this.trace(`  → curl http://localhost:${this.port}/v1/articles`)
    this.trace(`  → curl http://localhost:${this.port}/v1/articles/1\n`)
    this.trace('Use api /v[xxx]/ to mock HTTP status codes (403,404,500...) from server response:')
    this.trace(`  → curl http://localhost:${this.port}/v403/articles\n`)
    this.trace(`Mock Rest Server is ready and listen at port ${this.port}:`)
    this.server = this.startServer(this.port)
  }

  static start (port, silent, latency) {
    return new MockRestServer(port, silent, latency)
  }

  startServer (port) {
    const self = this
    return http.createServer((req, res) => {
      self.request(req, res)
    }).listen(port)
  }

  stop () {
    this.server.close()
  }

  populate (collection, length, schema) {
    var resource = () => {
      var json = {}
      for (const key in schema) {
        json[key] = Randomizer.get(schema[key])
      }
      return json
    }

    for (let i = 0; i < length; i++) {
      this.db.create(collection, resource())
    }
  }

  trace (str) {
    if (!this.silent) console.log(str)
  }

  paramParser (req) {
    const [query, param] = req.url.split('?')
    const [, version, collection, id] = query.split('/')
    const field = ((param && param.replace(/(page|sort)=[^&]+/g, '').match(/(\w+)=/)) || [])[1]
    const filter = ((param && param.replace(/(page|sort)=[^&]+/g, '').match(/=([^&]+)/)) || [])[1]
    const sort = ((param && param.match(/sort=([+-][a-z]+)/)) || [])[1]
    const page = ((param && param.match(/page=([0-9]+)/)) || [])[1]
    return {
      version: parseInt(version.replace('v', '')),
      collection,
      id: parseInt(id),
      field,
      filter,
      sort,
      page
    }
  }

  responseStatusCodes (req, json) {
    const jsonIsEmpty = Object.keys(json).length === 0

    // 2xx Success
    //
    // 200 OK
    if (req.method === 'GET' && (!jsonIsEmpty || Array.isArray(json))) {
      return 200
    }
    if (req.method === 'PUT' && !jsonIsEmpty) {
      return 200
    }
    if (req.method === 'PATCH' && !jsonIsEmpty) {
      return 200
    }

    // 201 Created
    if (req.method === 'POST') {
      return 201
    }

    // 204 No Content
    if (req.method === 'DELETE') {
      return 204
    }

    // 4xx Client errors
    //
    // 404 Not Found
    return 404
  }

  route (req, res, json) {
    const param = this.paramParser(req)

    if (req.method === 'OPTIONS') {
      return this.response(req, res, 200, {})
    }

    if (isNaN(param.version)) {
      return this.response(req, res, 400, {})
    }

    if (param.version !== 1) {
      return this.response(req, res, param.version, {})
    }

    if (req.method === 'POST') {
      json = this.db.create(param.collection, json)
      return this.response(req, res, this.responseStatusCodes(req, json), json)
    }

    if (req.method === 'GET') {
      json = this.db.read(param.collection, param.id)

      // Filtering
      if (param.field && param.filter) {
        var filtered = []
        json.forEach((item, i) => {
          if (item[param.field] && RegExp(item[param.field]).test(param.filter)) {
            filtered.push(item)
          }
          json = filtered
        })
      }

      // Sorting
      if (param.sort) {
        const asc = param.sort[0] === '+'
        const field = param.sort.slice(1)
        if (asc) {
          json.sort((a, b) => a[field].localeCompare(b[field]))
        } else {
          json.sort((a, b) => b[field].localeCompare(a[field]))
        }
      }

      // Pagination
      if (param.page) {
        const page = Math.max(1, parseInt(param.page) || 1)
        json = json.slice((page - 1) * 10, page * 10)
      }

      return this.response(req, res, this.responseStatusCodes(req, json), json)
    }

    if (req.method === 'PUT') {
      json.id = param.id
      json = this.db.replace(param.collection, json)
      return this.response(req, res, this.responseStatusCodes(req, json), json)
    }

    if (req.method === 'PATCH') {
      json.id = param.id
      json = this.db.update(param.collection, json)
      return this.response(req, res, this.responseStatusCodes(req, json), json)
    }

    if (req.method === 'DELETE') {
      json = this.db.delete(param.collection, param.id)
      return this.response(req, res, this.responseStatusCodes(req, json), json)
    }
  }

  request (req, res) {
    const self = this
    var data = ''
    req
      .on('data', d => {
        data += d
      })
      .on('end', () => {
        var json = {}
        try {
          json = data !== '' ? JSON.parse(data) : {}
        } catch (e) {
          return self.response(req, res, 400, {})
        }
        self.route(req, res, json)
      })
  }

  response (req, res, statusCode, json) {
    const headers = {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Max-Age': 3600,
      'Content-Type': 'application/json; charset=UTF-8'
    }
    json = JSON.stringify(json)
    this.trace(`  - ${req.method.padEnd(6, ' ')} ${req.url} → [${statusCode}] ${json}`)
    res.writeHead(statusCode, headers)
    setTimeout(() => res.end(json), this.latency)
  }
}

module.exports = MockRestServer
