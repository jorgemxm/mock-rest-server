<div align="center">
<p align="center">
<img src="https://gitlab.com/GuilleW/mock-rest-server/-/raw/master/.gitlab/MockRestServer.svg"  width="256" height="256" alt="Mock REST Server"/>
</p>

<p align="center">
<h3>Mock REST Server is a lightweight (in memory) REST server for unit test.</h3>
</p>

<p align="center">
<a href="https://gitlab.com/GuilleW/mock-rest-server/builds"><img src="https://gitlab.com/GuilleW/mock-rest-server/badges/master/pipeline.svg" alt="GitLab pipeline"></a>
<a href="https://gitlab.com/GuilleW/mock-rest-server/builds"><img src="https://gitlab.com/GuilleW/mock-rest-server/badges/master/coverage.svg" alt="GitLab coverage"></a>
<a href="https://snyk.io/test/npm/mock-rest-server"><img src="https://snyk.io/test/npm/mock-rest-server/badge.svg" alt="Known Vulnerabilities"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="JavaScript Standard Style"></a>
<a href="https://www.npmjs.com/package/mock-rest-server"><img src="https://img.shields.io/npm/v/mock-rest-server.svg" alt="NPM version"></a>
<a href="https://gitlab.com/GuilleW/mock-rest-server/-/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/mock-rest-server.svg" alt="License"></a>
</p>
<br/>
</div>

# Mock REST Server

No configuration needed: Just start it, and test your code!

Mock REST Server comes with these features 🚀 :
- [x] Support GET, POST, PUT, PATCH, DELETE and OPTIONS HTTP methods
- [x] Accept and respond with JSON
- [x] Support real HTTP status code response from REST API
- [x] Return HTTP error status codes via api version
- [x] Fake latency
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
| `--latency` | (Optional) wait before response | `Number` | `0` |

## Unit test

For more details, look at the [full example](https://gitlab.com/GuilleW/mock-rest-server/-/blob/master/test/MockRestServer.spec.js) from test file.

Assuming you're using a module-compatible system (like [webpack](https://webpack.js.org/)),
start MockRestServer on top of your unit test file:

```js
import MockRestServer from 'mock-rest-server'

describe('MockRestServer', function () {
  it('Start server', async () => {
    const server = await MockRestServer.start(3000, true, 0)
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
