const convert = require('joi-to-json-schema')
const Validator = require('jsonschema').Validator
const v = new Validator()
const Joi = require('joi')

class BaseController {
  async validate (model, json) {
    const jsonSchema = convert(Joi.object().keys(model.requestBody.body))
    if (model.requestBody) {
      const required = model.requestBody.required
      jsonSchema.required = required
      const result = await v.validate(json, jsonSchema)
      if (result.errors[0]) {
        const err = new Error()
        err.status = 422
        err.message = result.errors[0].message
        err.stack = result.errors[0].stack
        throw err
      }
    }
  }
}

module.exports = BaseController
