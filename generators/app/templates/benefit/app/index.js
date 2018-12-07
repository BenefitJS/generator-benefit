const appRoot = require('../config').appRoot

const files = [
  {
    name: 'context',
    path: `${appRoot}/app/common/context.js`
  },
  {
    name: 'router',
    path: `${appRoot}/app/routes/index.js`
  },
  {
    name: 'service',
    path: `${appRoot}/app/common/helper.js`,
    module: 'service'
  },
  {
    name: 'model',
    path: `${appRoot}/app/common/helper.js`,
    module: 'model'
  },
  {
    name: 'controller',
    path: `${appRoot}/app/common/helper.js`,
    module: 'controller'
  }
]

files.map(file => {
  exports[file.name] = file.module ? require(file.path)[file.module] : require(file.path)
})
