/* global describe it */

const expect = require('chai').expect
const MockRestServer = require('../src/MockRestServer')
const fetch = require('node-fetch')
const url = 'http://localhost:3000'
const latency = 500
var server

const dataset = [
  { title: 'foo', body: 'bar', userId: 1 },
  { title: 'lorem', body: 'ipsum', userId: 1 },
  { title: 'my', body: 'awesome text', userId: 2 }
]

describe('MockRestServer should', function () {
  it('Start server', async () => {
    await fetch(url)
      .then(response => {
        expect(response.errno).to.equal('ECONNREFUSED')
      })
      .catch((response) => {
        expect(response.errno).to.equal('ECONNREFUSED')
      })
    server = await MockRestServer.start(3000, true)
    await fetch(url)
      .then(response => {
        expect(response.status).to.equal(400)
      })
      .catch(err => console.log(err))
    await fetch(url, {
      method: 'OPTIONS'
    })
      .then(response => {
        expect(response.status).to.equal(200)
      })
      .catch(err => console.log(err))
  })
  it('Request POST     (Create a resource)', async () => {
    await dataset.forEach(async (item, i) => {
      const id = i + 1
      await fetch(`${url}/v1/articles`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => {
          expect(response.status).to.equal(201)
          return response.json()
        })
        .then(json => {
          expect(json.id).to.equal(id)
          expect(json.title).to.equal(item.title)
          expect(json.body).to.equal(item.body)
          expect(json.userId).to.equal(item.userId)
        })
        .catch(err => console.log(err))
    })
  })
  it('Request GET      (List all resources)', async () => {
    await fetch(`${url}/v1/articles`)
      .then(response => {
        expect(response.status).to.equal(200)
        return response.json()
      })
      .then(json => {
        dataset.forEach((item, i) => {
          item.id = i + 1
          expect(json[i].id).to.equal(item.id)
          expect(json[i].title).to.equal(item.title)
          expect(json[i].body).to.equal(item.body)
          expect(json[i].userId).to.equal(item.userId)
        })
      })
      .catch(err => console.log(err))
  })
  it('Request GET      (Get a resource)', async () => {
    await dataset.forEach(async (item, i) => {
      const id = i + 1
      await fetch(`${url}/v1/articles/${id}`)
        .then(response => {
          expect(response.status).to.equal(200)
          return response.json()
        })
        .then(json => {
          expect(json.id).to.equal(id)
          expect(json.title).to.equal(item.title)
          expect(json.body).to.equal(item.body)
          expect(json.userId).to.equal(item.userId)
        })
        .catch(err => console.log(err))
    })
  })
  it('Request PUT      (Create a resource)', async () => {
    await fetch(`${url}/v1/users/2`, {
      method: 'PUT',
      body: JSON.stringify({ user: 'Admin', password: '****' }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => {
        expect(response.status).to.equal(200)
        return response.json()
      })
      .then(json => {
        expect(json.id).to.equal(2)
        expect(json.user).to.equal('Admin')
        expect(json.password).to.equal('****')
      })
      .catch(err => console.log(err))
  })
  it('Request PUT      (Replace a resource)', async () => {
    await dataset.forEach(async (item, i) => {
      const id = i + 1
      item.id = id
      delete item.title
      item.body += ' ' + item.id
      await fetch(`${url}/v1/articles/${id}`, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => {
          expect(response.status).to.equal(200)
          return response.json()
        })
        .then(json => {
          expect(json.id).to.equal(item.id)
          expect(json.title).to.equal(undefined)
          expect(json.body).to.equal(item.body)
          expect(json.userId).to.equal(item.userId)
        })
        .catch(err => console.log(err))
    })
  })
  it('Request PATCH    (Create a resource)', async () => {
    await fetch(`${url}/v1/world/2`, {
      method: 'PATCH',
      body: JSON.stringify({ password: '*' }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => {
        expect(response.status).to.equal(200)
        return response.json()
      })
      .then(json => {
        expect(json.id).to.equal(2)
        expect(json.password).to.equal('*')
      })
      .catch(err => console.log(err))
  })
  it('Request PATCH    (Update a resource)', async () => {
    await dataset.forEach(async (item, i) => {
      const id = i + 1
      item.id = id
      item.body += '!'
      await fetch(`${url}/v1/articles/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ body: item.body }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => {
          expect(response.status).to.equal(200)
          return response.json()
        })
        .then(json => {
          expect(json.id).to.equal(item.id)
          expect(json.title).to.equal(undefined)
          expect(json.body).to.equal(item.body)
          expect(json.userId).to.equal(item.userId)
        })
        .catch(err => console.log(err))
    })
  })
  it('Request with filtering', async () => {
    await fetch(`${url}/v1/articles?userId=1`)
      .then(response => {
        expect(response.status).to.equal(200)
        return response.json()
      })
      .then(json => {
        var len = 0
        json.forEach((item, i) => {
          expect(item.userId).to.equal(1)
          len++
        })
        expect(len).to.equal(2)
      })
      .catch(err => console.log(err))
  })
  it('Request with sorting', async () => {
    await fetch(`${url}/v1/articles?sort=+body`)
      .then(response => {
        expect(response.status).to.equal(200)
        return response.json()
      })
      .then(json => {
        expect(json[0].id).to.equal(3)
        expect(json[1].id).to.equal(1)
        expect(json[2].id).to.equal(2)
      })
      .catch(err => console.log(err))
    await fetch(`${url}/v1/articles?sort=-body`)
      .then(response => {
        expect(response.status).to.equal(200)
        return response.json()
      })
      .then(json => {
        expect(json[0].id).to.equal(2)
        expect(json[1].id).to.equal(1)
        expect(json[2].id).to.equal(3)
      })
      .catch(err => console.log(err))
  })
  it('Populate database', async () => {
    server.populate('articles', 30, {
      title: String,
      body: String,
      userId: Number,
      created: Date,
      private: Boolean
    })
    await fetch(`${url}/v1/articles`)
      .then(response => {
        expect(response.status).to.equal(200)
        return response.json()
      })
      .then(json => {
        expect(json[3].title).to.be.a('string')
        expect(json[3].body).to.be.a('string')
        expect(json[3].userId).to.be.a('number')
        expect(json[3].created).to.be.a('string')
        expect(json[3].private).to.be.a('boolean')
        expect(json.length).to.equal(30 + dataset.length)
      })
      .catch(err => console.log(err))
  })
  it('Request with pagination', async () => {
    await fetch(`${url}/v1/articles?page=2`)
      .then(response => {
        expect(response.status).to.equal(200)
        return response.json()
      })
      .then(json => {
        for (let i = 0; i < 10; i++) {
          expect(json[i].id).to.equal(i + 11)
        }
      })
      .catch(err => console.log(err))
  })
  it('Request DELETE   (Delete a resource)', async () => {
    await fetch(`${url}/v1/articles/1`, {
      method: 'DELETE'
    })
      .then(response => {
        expect(response.status).to.equal(204)
      })
      .catch(err => console.log(err))
    await fetch(`${url}/v1/articles/1`)
      .then(response => {
        expect(response.status).to.equal(404)
      })
      .catch(err => console.log(err))
  })
  it('Request DELETE   (Delete collection)', async () => {
    await fetch(`${url}/v1/articles`, {
      method: 'DELETE'
    })
      .then(response => {
        expect(response.status).to.equal(204)
      })
      .catch(err => console.log(err))
    await fetch(`${url}/v1/articles`)
      .then(response => {
        expect(response.status).to.equal(404)
        return response.json()
      })
      .catch(err => console.log(err))
  })
  it('Respond with 500 (Internal Server Error)', async () => {
    await fetch(`${url}/v500/articles`)
      .then(response => {
        expect(response.status).to.equal(500)
      })
      .catch(err => console.log(err))
  })
  it('Respond with 400 (Broken JSON → Bad Request Error)', async () => {
    await fetch(`${url}/v1/articles`, {
      method: 'POST',
      body: '{a:1, $b:2}'
    })
      .then(response => {
        expect(response.status).to.equal(400)
      })
      .catch(err => console.log(err))
  })
  it('Stop server', async () => {
    await fetch(url)
      .then(response => {
        expect(response.status).to.equal(400)
      })
      .catch(err => console.log(err))
    await server.stop()
    await fetch(url)
      .then(response => {
        expect(response.errno).to.equal('ECONNREFUSED')
      })
      .catch((response) => {
        expect(response.errno).to.equal('ECONNREFUSED')
      })
  })
})

describe('MockRestServer should run in verbose mode', function () {
  it('Verbose mode works', async () => {
    server = await MockRestServer.start()
    await dataset.forEach(async (item, i) => {
      await fetch(`${url}/v1/articles`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => {
          expect(response.status).to.equal(201)
        })
        .catch(err => console.log(err))
      await server.stop()
    })
  })
})

describe(`MockRestServer should respond to query with ${latency}ms latency`, function () {
  this.timeout(latency + 500)
  it('Latency OK!', async () => {
    server = await MockRestServer.start(3000, true, latency)
    const t1 = new Date().getTime()
    await fetch(`${url}/v1/articles`)
      .then(response => {
        const t2 = new Date().getTime()
        expect(t2 - t1).to.be.above(latency)
      })
      .catch(err => console.log(err))
    await server.stop()
  })
  this.timeout(0)
})
