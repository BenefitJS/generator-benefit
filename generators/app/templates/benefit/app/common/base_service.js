class BaseService {
  constructor () {
    this.logger = require('./logger').logger
  }
  error (status, message) {
    const err = new Error()
    err.status = status
    err.message = message
    throw err
  }
}

module.exports = BaseService
