const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const mongoose = require('mongoose')

const async = require('async')

exports.create = (req, resolve, reject) => {
  authorIds = [req.body.author._id]
  genreIds = req.body.genre.map(g => g._id)
  async.parallel({
    authors: function (callback) {
      Author.find({ _id: [authorIds] }, callback)
    },
    genres: function (callback) {
      Genre.find({ _id: [genreIds] }, callback)
    }
  }, function (err, results) {
    if (err) {
      return reject(err)
    }
    if (results.authors.length == 0) {
      return reject({ msg: '作者不可用-' + req.body.author._id })
    }
    if (results.genres.length == 0) {
      return reject({ msg: '类型不可用' + req.body.genre })
    }
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: typeof req.body.genre === 'undefined' ? [] : req.body.genre
    })

    book.save(function (err) {
      if (err) {
        return reject(err)
      } else {
        resolve(book)
      }
    })
  })
}

exports.delete = (id, resolve, reject) => {
  id = mongoose.Types.ObjectId(id)
  Book.findById(id, (err, book) => {
    if (err) {
      return reject(err)
    }
    if (book != null) {
      Book.findByIdAndRemove(id, err => {
        if (err) {
          return reject(err)
        }
        return resolve({ id })
      })
    } else {
      reject({ msg: '找不到该书籍' })
    }
  })
}

exports.update = (req, resolve, reject) => {
  console.log('body ', req.body)

  id = mongoose.Types.ObjectId(req.body._id)
  const book = new Book({
    _id: id,
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: typeof req.body.genre === 'undefined' ? [] : req.body.genre
  })
  console.log(book)
  Book.findByIdAndUpdate(id, book, {}, function (err, modifiedbook) {
    if (err) {
      return reject(err)
    }
    if (modifiedbook == null) {
      return reject({ msg: '找不到该书籍' })
    } else {
      resolve(modifiedbook)
    }
  })
}

exports.detail = (id, resolve, reject) => {
  id = mongoose.Types.ObjectId(id)
  Book.findById(id)
    .populate('author')
    .populate('genre')
    .exec((err, book) => {
      if (err) {
        return reject(err)
      } else {
        resolve(book)
      }
    })
}

exports.list = (resolve, reject) => {
  Book.find({}, 'title author genre summary isbn')
    .populate('author', 'first_name family_name')
    .populate('genre', 'name')
    .exec((err, books) => {
      if (err) {
        return reject(err)
      } else {
        resolve(books)
      }
    })
}
