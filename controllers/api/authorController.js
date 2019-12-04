const service = require('../../service/authorService')
const { validationResult } = require('express-validator');


exports.create = (req, res, next) => {
  const errors = validationResult(req)
  console.error(errors)

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  } else {
    const resolve = author => {
      service.detail(author._id, (authorDetail) => { res.json(authorDetail) }, next)
    }
    service.create(req, resolve, next)
  }
}

exports.delete = (req, res, next) => {

  service.delete(req.params.id, (result) => {
    res.json(result)
  }, next)
}

exports.update = (req, res, next) => {
  const errors = validationResult(req)
  console.error(errors)

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  } else {
    const resolve = author => {
      service.detail(author._id, (authorDetail) => { res.json(authorDetail) }, next)
    }
    service.update(req, resolve, next)
  }
}

exports.detail = (req, res, next) => {

  service.detail(req.params.id, (author) => {
    res.json(author)
  }, next)
}

exports.list = (req, res, next) => {

  service.list((authors) => {
    res.json(authors)
  }, next)
}
