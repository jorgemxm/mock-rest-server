const fs = require('fs')
const { execSync } = require('child_process')
const request = require('./request')

const content = fs.readFileSync('CHANGELOG.md', { encoding: 'utf8', flag: 'r' })
const changelog = content.split('\n## ')[2] || ''
const version = (changelog.match(/\[(.+?)\]/) || [])[1] || ''
const tagVersion = execSync("git describe --abbrev=0 2>/dev/null || echo ''").toString().replace(/^v/, '')

console.log(process.env);

if (version !== '' && version !== tagVersion) {
  console.log(`Trigger Release job! ${tagVersion} -> ${version}`)
  ;(async () => {
    await request(`https://gitlab.com/api/v4/projects/${process.env.CI_PROJECT_ID}/trigger/pipeline`, {
      token: `${process.env.CI_JOB_TOKEN}`,
      ref: 'master',
      variables: { TRIGGER_JOB: 'Release' }
    })
  })()
}
