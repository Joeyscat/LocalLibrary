const service = require('../../service/bookService')
const { validationResult } = require('express-validator');


exports.create = (req, res, next) => {
  const errors = validationResult(req)
  console.error(errors)

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  } else {
    const resolve = book => {
      service.detail(book._id, (bookDetail) => { res.json(bookDetail) }, next)
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

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  } else {
    const resolve = book => {
      service.detail(book._id, (bookDetail) => { return res.json(bookDetail) }, next)
    }
    service.update(req, resolve, next)
  }
}

exports.detail = (req, res, next) => {

  service.detail(req.params.id, (book) => {
    return res.json(book)
  }, next)
}

exports.list = (req, res, next) => {

  service.list((books) => {
    res.json(books)
  }, next)
}
