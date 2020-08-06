const https = require('https')

module.exports = function (url, data) {
  return new Promise((resolve, reject) => {
    data = JSON.stringify(data)

    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PRIVATE-TOKEN': `${process.env.GIT_PUSH_TOKEN}`,
        'Content-Length': data.length
      }
    }, (res) => {
      console.log(`STATUS: ${res.statusCode}`)
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
      res.on('data', (d) => {
        process.stdout.write(d)
      })
      res.on('end', () => {
        resolve()
      })
    })
    req.on('error', (e) => {
      console.error(e)
      reject(e)
    })
    req.write(data)
    req.end()
  })
}
