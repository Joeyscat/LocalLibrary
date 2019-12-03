const Book = require('../models/book')
const BookInstance = require('../models/bookinstance')
const mongoose = require('mongoose')

const async = require('async')

exports.book_delete = (id, resolve, reject) => {
  res.send('未实现：删除藏书')
}

exports.book_update = (req, resolve, reject) => {
  // TODO 参数校验整理到 util

  id = mongoose.Types.ObjectId(req.params.id)
  const book = new Book({
    _id: id,
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: typeof req.body.genre === 'undefined' ? [] : req.body.genre
  })
  Book.findByIdAndUpdate(id, book, {}, function(err, thebook) {
    if (err) {
      return reject(err)
    }
    resolve(thebook)
  })
}

exports.book_detail = (id, resolve, reject) => {
  id = mongoose.Types.ObjectId(id)
  Book.findById(id)
    .populate('author')
    .populate('genre')
    .exec((err, book) => {
      if (err) {
        return reject(err)
      }
      resolve(book)
    })
}

exports.book_list = (resolve, reject) => {
  Book.find({}, 'title author')
    .populate('author')
    .exec((err, books) => {
      if (err) {
        return reject(err)
      }
      resolve(books)
    })
}
