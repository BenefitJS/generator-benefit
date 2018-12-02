# benefit
BenefitJS base on koa.js, running in v8 runtime.

[![standard][standard-image]][standard-url]

[![Build Status][travis-image]][travis-url]
[![codecov][codecov-image]][codecov-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![license][license-image]][license-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/BenefitJS/benefit.svg)](https://greenkeeper.io/)

#### The framework is mainly to solve the relationship document and service.

### description

* The framework uses the Joi implementation model and generates a document data dictionary from the model. Then generate a swagger document through the data dictionary and writing relevant interface information.

### So how to write this document?

#### define model

```javascript

const props = {
  id: Joi.number().integer().description('id'),
  phone: Joi.string().description('phone'),
  password: Joi.string().description('password')
}

const schema = Joi.object().keys(props).description('user info')
```

#### index

```javascript
index: {
  path: '/users',
  method: 'get',
  tags: ['users'],
  summary: 'get users list',
  query: _.pick(props, ['phone']),
  output: {
    200: Joi.object().keys({
      result: Joi.array().items(props).description('users list')
    })
  }
}
```
#### create

```javascript
create: {
  path: '/users',
  method: 'post',
  tags: ['users'],
  summary: 'create user',
  requestBody: {
    body: _.pick(props, ['phone', 'password']),
    required: ['phone', 'password']
  },
  output: {
    200: Joi.object().keys(props).description('result')
  }
}
```

#### show

```javascript
show: {
  path: '/users/:id',
  method: 'get',
  tags: ['users'],
  summary: 'get user',
  params: _.pick(props, ['id']),
  output: {
    200: Joi.object().keys(props).description('result')
  }
}
```

#### update
```javascript
update: {
  path: '/users/{id}',
  method: 'put',
  tags: ['users'],
  summary: 'update user',
  params: _.pick(props, ['id']),
  requestBody: {
    body: _.pick(props, ['phone'])
  },
  output: {
    200: Joi.array().items(Joi.number()).descript('result')
  }
}
```

#### destroy
```javascript
destroy: {
  path: '/users/{id}',
  method: 'put',
  tags: ['users'],
  summary: 'destroy user',
  params: _.pick(props, ['id']),
  output: {
    200: Joi.number().descript('result')
  }
}
```

[travis-image]: https://travis-ci.org/BenefitJS/benefit.svg?branch=master
[travis-url]: https://travis-ci.org/BenefitJS/benefit
[codecov-image]: https://codecov.io/gh/BenefitJS/benefit/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/BenefitJS/benefit
[daviddm-image]: https://david-dm.org/BenefitJS/benefit.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/BenefitJS/benefit
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: https://opensource.org/licenses/MIT
[standard-image]:
https://cdn.rawgit.com/standard/standard/master/badge.svg
[standard-url]:
https://github.com/standard/standard
