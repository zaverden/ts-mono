#!/usr/bin/env node
const { execSync } = require('child_process')

const cwd = process.cwd()
const [prefix] = process.argv.slice(2)
const package = require(`${cwd}/package.json`)
const scriptPrefix = prefix + ':'
const scripts = Object.keys(package.scripts).filter(s => s.startsWith(scriptPrefix))

for (const script of scripts) {
  const cmd = `yarn "${script}"`;
  console.log('$ ' + cmd)
  execSync(cmd, {
    cwd,
    stdio: 'inherit',
    encoding: 'utf8',
  })
}
