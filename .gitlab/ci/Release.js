const fs = require('fs')
const { execSync } = require('child_process')
const request = require('./request')

const content = fs.readFileSync('CHANGELOG.md', { encoding: 'utf8', flag: 'r' })
const changelog = content.split('\n## ')[2] || ''
const version = (changelog.match(/\[(.+?)\]/) || [])[1] || ''

// Update package.json version
console.log(execSync(`git config user.email "${process.env.GITLAB_USER_EMAIL}"`).toString())
console.log(execSync(`git config user.name "${process.env.GITLAB_USER_NAME}"`).toString())
console.log(execSync(`npm version "${version}" -m "Release v${version}"`).toString())
console.log(execSync(`git push https://gitlab-ci-token:${process.env.GIT_PUSH_TOKEN}@gitlab.com/${process.env.CI_PROJECT_PATH}.git HEAD:${process.env.CI_COMMIT_REF_NAME}`).toString())

// Create new Tag/Release
;(async () => {
  await request(`https://gitlab.com/api/v4/projects/${process.env.CI_PROJECT_ID}/releases`, {
    name: `Release v${version}`,
    ref: process.env.CI_COMMIT_SHA,
    tag_name: `v${version}`,
    description: `## ${changelog}`.replace(/(["'’`])/g, '\\$1')
  })
})()
