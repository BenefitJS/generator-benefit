const appRoot = require('../config').appRoot

const files = [
  {
    name: 'context',
    path: `${appRoot}/app/common/context.js`
  },
  {
    name: 'router',
    path: `${appRoot}/app/routes/index.js`
  }
]

files.map(file => {
  exports[file.name] = require(file.path)
})
