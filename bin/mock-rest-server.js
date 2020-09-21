#!/usr/bin/env node
'use strict'

var port, silent, latency
process.argv.forEach((param, i) => {
  if (/--port=/.test(param)) {
    port = param.match(/--port=(\w+)/)[1]
  }
  if (/--silent/.test(param)) {
    silent = true
  }
  if (/--latency/.test(param)) {
    latency = param.match(/--latency=(\w+)/)[1]
  }
})

const server = require('../src/MockRestServer')
server.start(port, silent, latency)
