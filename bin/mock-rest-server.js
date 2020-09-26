#!/usr/bin/env node
'use strict'

const args = process.argv.slice(2);

function printHelp() {
  console.log('Mock Rest Server:\n')
  console.log(' --port=     -p=3000    (optional) 3000')
  console.log(' --silent    -s         (optional) false')
  console.log(' --latency=  -l=500     (optional) 0 ms\n')
}

if (/^(-h|--help)$/i.test(args[0])) {
  printHelp()
  process.exit(0)
}

/**
 * Initialize
 */
let port, silent, latency

process.argv.slice(2).forEach((param, i) => {
  if (/^(--port|-p)=?/.test(param)) {
    const match = param.match(/(--port|-p)=?(\w+)/)
    match && (port = match.pop())
  }
  if (/^(--silent|-s)/.test(param)) {
    silent = true
  }
  if (/^(--latency|-l)=?/.test(param)) {
    const match = param.match(/(--latency|-l)=?(\w+)/).pop()
    match && (latency = match.pop())
  }
})

const server = require('../src/MockRestServer')
server.start(port, silent, latency)
