const path = require('path')
const fs = require('fs')
const appRoot = require('../../config').appRoot
const dir = path.resolve(`${appRoot}/app/services/`)
fs.readdirSync(dir).forEach(file => {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    const name = file.replace('.js', '')
    exports[name] = require('./' + file)
  }
})
