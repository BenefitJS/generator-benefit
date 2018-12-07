const dir = require('dir_filenames')
const config = require('../../config')
const controllers = dir(`${config.appRoot}/app/controller`)
const services = dir(`${config.appRoot}/app/services`)
const models = dir(`${config.appRoot}/app/models`)
const controller = {}
const service = {}
const model = {}
controllers.map(file => {
  let name = file.split('/').pop().replace(/\.\w+$/, '')
  controller[name] = require(file)
})
services.map(file => {
  let name = file.split('/').pop().replace(/\.\w+$/, '')
  service[name] = require(file)
})
models.map(file => {
  let name = file.split('/').pop().replace(/\.\w+$/, '')
  model[name] = require(file)
})
module.exports = {
  controller,
  service,
  model
}
