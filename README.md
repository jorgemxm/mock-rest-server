<div align="center">
<img src="https://gitlab.com/GuilleW/mock-rest-server/-/raw/master/.gitlab/MockRestServer.svg"  width="256" height="256" alt="Mock REST Server"/>

#### Mock REST Server is a lightweight (in memory) REST server for unit test. 

[![GitLab pipeline](https://gitlab.com/GuilleW/mock-rest-server/badges/master/pipeline.svg)](https://gitlab.com/GuilleW/mock-rest-server/builds)
[![GitLab coverage](https://gitlab.com/GuilleW/mock-rest-server/badges/master/coverage.svg)](https://gitlab.com/GuilleW/mock-rest-server/builds)
[![Known Vulnerabilities](https://snyk.io/test/npm/mock-rest-server/badge.svg)](https://snyk.io/test/npm/mock-rest-server)
[![JavaScript Standard Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![NPM version](https://img.shields.io/npm/v/mock-rest-server.svg)](https://www.npmjs.com/package/mock-rest-server)
[![License](https://img.shields.io/npm/l/mock-rest-server.svg)](https://gitlab.com/GuilleW/mock-rest-server/-/blob/master/LICENSE)
</div>

# Mock REST Server

No configuration needed: Just start it, and test your code!

Mock REST Server comes with these features 🚀 :
- [x] Support GET, POST, PUT, PATCH and DELETE HTTP methods
- [x] Accept and respond with JSON
- [x] Support real HTTP status code response from REST API
- [x] Return HTTP error status codes via api version
- [x] Filtering, sorting and pagination
- [x] Auto populate tool to fill database, don't waste your time for a REST server!

# Changes

All [details of changes](https://gitlab.com/GuilleW/mock-rest-server/-/blob/master/CHANGELOG.md) to this project will be documented in this file.

# Installation & Usage

```sh
npm i -D mock-rest-server
node_modules/.bin/mock-rest-server
```

| Param name | Description | Type | Default |
| ----------- | ----------- | ---- | ------- |
| `--port=3000` | (Optional) Change server port | `Number` | `3000` |
| `--silent` | (Optional) Hide server output | `Boolean` | `false` |

## Unit test

For more details, look at the [full example](https://gitlab.com/GuilleW/mock-rest-server/-/blob/master/test/MockRestServer.spec.js) from test file.

Assuming you're using a module-compatible system (like [webpack](https://webpack.js.org/)),
start MockRestServer on top of your unit test file:

```js
import MockRestServer from 'MockRestServer'

describe('MockRestServer', function () {
  it('Start server', async () => {
    const server = await MockRestServer.start(3000, true)
    server.populate('articles', 30, {
      title: String,
      body: String,
      userId: Number,
      created: Date,
      private: Boolean
    })

    // ...
    // ...
    // ...

    // don't forget to stop!
    // If you work with `--watch` param that reload your unit test, don't forget to stop server at the end of your tests.
    // It'll try to launch server again when refresh, and port will already in use.
    await server.stop()
  })
})
```

MockRestServer come with (optional) awesome feature that fill database with random typed data: `populate(collection, length, schema)`

| Param name | Description | Type |
| ----------- | ----------- | ---- |
| `collection` | Collection name to create/populate | `String` |
| `length` | Number of resource to create in collection | `Number` |
| `schema` | Object send to create a resource. Values are replaced by random value based on JS type `String`, `Number`, `Date` or `Boolean`. | `Object` |

# Example

Start MockRestServer, open a new shell and run some curl on api `/v1/`:
```sh
curl -X POST -d '{"title":"Awesome news!","body":"Some content."}' http://localhost:3000/v1/articles
# {"title":"Awesome news!","body":"Some content.","id":1}
```

Now, get your articles with:
```sh
curl http://localhost:3000/v1/articles
# [{"title":"Awesome news!","body":"Some content.","id":1},{"title":"Awesome news!","body":"Some content.","id":2}]
curl http://localhost:3000/v1/articles/1
# {"title":"Awesome news!","body":"Some content.","id":1}
```

Use api `/v[xxx]/` to mock HTTP status codes (403, 404, 500...) from server response:
```sh
curl http://localhost:3000/v403/articles
```

# Contribution

Any help or feedback are really welcome, **no matter how great or small**!

Please make sure to read the [Contributing Guide](https://gitlab.com/GuilleW/mock-rest-server/-/blob/master/CONTRIBUTING.md) before making a pull request.

# License

[GPL-3.0](https://gitlab.com/GuilleW/mock-rest-server/-/blob/master/LICENSE)
