const service = require('../../service/genreService')
const { validationResult } = require('express-validator')

exports.create = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }
  service
    .create(req)
    .then(result => {
      return res.json(result)
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
    .list()
    .then(result => {
      return res.json(result)
    })
    .catch(err => next(err))
}
