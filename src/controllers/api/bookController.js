const service = require('../../service/bookService')
const { validationResult } = require('express-validator')
const { success } = require('./responseBuilder')

exports.create = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }
  service
    .create(req)
    .then(result => {
      service
        .detail(result._id)
        .then(detail => {
          res.json(detail)
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}

exports.delete = (req, res, next) => {
  service
    .delete(req.params.id)
    .then(result => {
      return res.json(result)
    })
    .catch(err => next(err))
}

exports.update = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  service
    .update(req)
    .then(() => {
      service
        .detail(req.body._id)
        .then(result => {
          return res.json(result)
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}

exports.detail = (req, res, next) => {
  service
    .detail(req.params.id)
    .then(result => {
      return res.json(result)
    })
    .catch(err => next(err))
}

exports.list = (req, res, next) => {
  service
    .list(req.query)
    .then(result => {
      return res.json(success(result))
    })
    .catch(err => next(err))
}
