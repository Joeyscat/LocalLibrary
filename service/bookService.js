const Book = require('../models/book')
const mongoose = require('mongoose')


exports.book_create = (req, resolve, reject) => {
  console.log(req.body)

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: (typeof req.body.genre === 'undefined') ? [] : req.body.genre
  })

  book.save(function (err) {
    if (err) { return reject(err) }
    resolve(book)
  })
}

exports.book_delete = (id, resolve, reject) => {
  id = mongoose.Types.ObjectId(id)
  Book.findById(id, (err, book) => {
    if (err) { return reject(err); }
    if (book != null) {
      Book.findByIdAndRemove(id, (err) => {
        if (err) { return reject(err); }
        resolve({ id })
      })
    }
    reject({ msg: '找不到该书籍' })
  })
}

exports.book_update = (req, resolve, reject) => {

  id = mongoose.Types.ObjectId(req.params.id)
  const book = new Book({
    _id: id,
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: typeof req.body.genre === 'undefined' ? [] : req.body.genre
  })
  Book.findByIdAndUpdate(id, book, {}, function (err, thebook) {
    if (err) {
      return reject(err)
    }
    if (thebook == null) {
      return reject({ msg: '找不到该书籍' })
    } else {
      resolve(thebook)
    }
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
