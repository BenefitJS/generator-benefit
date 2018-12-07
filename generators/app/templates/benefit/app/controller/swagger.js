const swagger = require('../common/swagger')

class SwaggerController {
  async doc (ctx) {
    ctx.body = await swagger.generateSwagger(
      {
        'title': 'Demo API document',
        'version': 'v3',
        'description': 'Using swagger3.0 & joi to generate swagger.json',
        'contact': {
          'name': 'AlfieriChou',
          'email': 'alfierichou@gmail.com',
          'url': 'https://alfierichou.com'
        },
        'license': {
          'name': 'MIT',
          'url': 'https://github.com/Alfieri-Jun-teams/koa_joi_swagger/blob/master/LICENSE'
        }
      }
    )
  }
  async index (ctx) {
    await ctx.render('index.html', { url: '/v1/swagger.json' })
  }
}

module.exports = new SwaggerController()
