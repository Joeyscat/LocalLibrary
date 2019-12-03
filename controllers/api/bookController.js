const bookService = require('../../service/bookService')

exports.book_detail = (req, res, next) => {
  const resolve = book => {
    res.json(book)
  }
  const reject = error => {
    return next(error)
  }

  bookService.book_detail(req.params.id, resolve, reject)
}

exports.book_list = (req, res, next) => {
  const resolve = books => {
    res.json(books)
  }
  const reject = error => {
    return next(error)
  }
  bookService.book_list(resolve, reject)
}
