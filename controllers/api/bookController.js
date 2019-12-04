const bookService = require('../../service/bookService')
const { validationResult } = require('express-validator');


exports.book_create = (req, res, next) => {
  const errors = validationResult(req)
  console.error(errors)

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  } else {
    const resolve = book => {
      bookService.book_detail(book._id, (bookDetail) => { res.json(bookDetail) }, next)
    }
    bookService.book_create(req, resolve, next)
  }
}

exports.book_delete = (req, res, next) => {

  bookService.book_delete(req.params.id, (result) => {
    res.json(result)
  }, next)
}

exports.book_update = (req, res, next) => {
  const errors = validationResult(req)
  console.error(errors)

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  } else {
    const resolve = book => {
      bookService.book_detail(book._id, (bookDetail) => { res.json(bookDetail) }, next)
    }
    bookService.book_update(req, resolve, next)
  }
}

exports.book_detail = (req, res, next) => {

  bookService.book_detail(req.params.id, (book) => {
    res.json(book)
  }, next)
}

exports.book_list = (req, res, next) => {

  bookService.book_list((books) => {
    res.json(books)
  }, next)
}
