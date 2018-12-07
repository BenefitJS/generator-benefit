const Joi = require('joi')
const convert = require('joi-to-json-schema')
const _ = require('lodash')
const appRoot = require('../../config').appRoot
const dir = require('dir_filenames')

const swaggerPath = (item) => {
  const content = {
    tags: item.tags,
    summary: item.summary
  }
  if (item.query) {
    content.parameters = []
    const jsonSchema = convert(Joi.object().keys(item.query))
    for (let prop in item.query) {
      let field = {}
      field.name = prop
      field.in = 'query'
      field.description = jsonSchema.properties[prop].description
      field.schema = {
        'type': jsonSchema.properties[prop].type
      }
      field.required = false
      content.parameters.push(field)
    }
  }
  if (item.requestBody) {
    let params = convert(Joi.object().keys(item.requestBody.body))
    let bodySchema = {}
    bodySchema.required = true
    bodySchema.content = {
      'application/json': {
        'schema': {
          'type': params.type,
          'properties': params.properties,
          'required': item.requestBody.required
        }
      }
    }
    content.requestBody = bodySchema
  }
  if (item.params) {
    content.parameters = []
    const jsonSchema = convert(Joi.object().keys(item.params))
    for (let prop in item.params) {
      let field = {}
      field.name = prop
      field.in = 'path'
      field.description = jsonSchema.properties[prop].description
      field.schema = {
        'type': jsonSchema.properties[prop].type
      }
      field.required = true
      content.parameters.push(field)
    }
  }
  return content
}

const generateSwagger = (info) => {
  const items = dir(`${appRoot}/app/models`)
  let methods = []
  let components = {}
  components.schemas = {}
  items.forEach(item => {
    let model = require(item)
    item = item.split('/').pop().replace(/\.\w+$/, '')
    let schemaName = item.slice(0, 1).toUpperCase() + item.slice(1)
    for (let index in model) {
      if (index === 'schema') {
        const modelSchema = convert(model[index])
        let schema = {}
        schema[schemaName] = {
          'type': 'object',
          'properties': modelSchema.properties
        }
        components.schemas = _.merge(components.schemas, schema)
      } else {
        const content = swaggerPath(model[index])

        if (model[index].output) {
          const response = model[index].output
          const outputTemp = {}
          const keys = _.keys(response)
          let resp = {}
          keys.forEach(key => {
            resp[key] = {
              'description': 'response',
              'content': {
                'application/json': {
                  'schema': {
                    type: convert(response[key]).type,
                    properties: convert(response[key]).properties
                  }
                }
              }
            }
            _.merge(outputTemp, resp)
          })
          content.responses = outputTemp
        } else {
          content.responses = {
            200: {
              'description': 'response success',
              'content': {
                'application/json': {
                  'schema': { $ref: `#/components/schemas/${schemaName}` }
                }
              }
            }
          }
        }

        let swaggerMethod = {}
        swaggerMethod[(model[index].method).toString()] = content

        let swaggerItem = {}
        swaggerItem[(model[index].path).toString()] = swaggerMethod
        methods.push(swaggerItem)
      }
    }
  })

  let mergeMethod = {}
  for (let i = 0; i < methods.length; ++i) {
    mergeMethod = _.merge(mergeMethod, methods[i])
  }

  let swagger = {}
  swagger.openapi = '3.0.0'
  swagger.info = info
  swagger.paths = mergeMethod
  swagger.components = components
  return swagger
}

module.exports = {
  generateSwagger
}
