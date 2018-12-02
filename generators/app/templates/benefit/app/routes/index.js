const KoaRouter = require('koa-router')
const controller = require('../controller')
const api = KoaRouter()

api.prefix('/v1')
api.get('/users', controller.user.index)
api.post('/users', controller.user.create)
api.get('/users/:id', controller.user.show)
api.put('/users/:id', controller.user.update)
api.delete('/users/:id', controller.user.destroy)

api.get('/swagger.json', controller.swagger.doc)
api.get('/apidoc', controller.swagger.index)

module.exports = api
