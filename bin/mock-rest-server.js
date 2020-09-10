#!/usr/bin/env node
'use strict'

var port, silent
process.argv.forEach((param, i) => {
  if (/--port=/.test(param)) {
    port = param.match(/--port=(\w+)/)[1]
  }
  if (/--silent/.test(param)) {
    silent = true
  }
})

const server = require('../src/MockRestServer')
server.start(port, silent)
