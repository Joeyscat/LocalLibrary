const service = require('../../service/genreService')
const { validationResult } = require('express-validator')
const { success, failure } = require('./responseBuilder')

exports.create = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json(failure(errors.array()))
  }
  service
    .create(req)
    .then(result => {
      return res.json(success(result))
    })
    .catch(err => res.json(failure(err)))
}

exports.delete = (req, res, next) => {
  service
    .delete(req.params.id)
    .then(result => {
      return res.json(success(result))
    })
    .catch(err => res.json(failure(err)))
}

exports.update = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json(failure(errors.array()))
  }
  service
    .update(req)
    .then(() => {
      service
        .detail(req.body._id)
        .then(result => {
          return res.json(success(result))
        })
        .catch(err => res.json(failure(err)))
    })
    .catch(err => res.json(failure(err)))
}

exports.detail = (req, res, next) => {
  service
    .detail(req.params.id)
    .then(result => {
      return res.json(success(result))
    })
    .catch(err => res.json(failure(err)))
}

exports.list = (req, res, next) => {
  service
    .list(req.query)
    .then(result => {
      return res.json(success(result))
    })
    .catch(err => res.json(failure(err)))
}
