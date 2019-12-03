const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookInstance = require('../models/bookinstance')
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const async = require('async')

exports.index = (req, res) => {

  async.parallel({
    book_count: function (callback) {
      Book.count({}, callback)
    },
    book_instance_count: function (callback) {
      BookInstance.count({}, callback)
    },
    book_instance_available_count: function (callback) {
      BookInstance.count({ status: '可供借阅' }, callback)
    },
    author_count: function (callback) {
      Author.count({}, callback)
    },
    genre_count: function (callback) {
      Genre.count({}, callback)
    }
  }, function (err, results) {
    res.render('index', { title: 'Local Library Home', error: err, data: results })
  })

}

exports.book_create_get = (req, res) => {
  async.parallel({
    authors: function (callback) {
      Author.find(callback);
    },
    genres: function (callback) {
      Genre.find(callback);
    },
  }, function (err, results) {
    if (err) { return next(err); }
    res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres });
  });
}

exports.book_create_post = [
  (req, res, next) => {
    let genre = req.body.genre
    if (!(genre instanceof Array)) {
      if (typeof genre === 'undefined') {
        req.body.genre = new Array()
      } else {
        req.body.genre = new Array(genre)
      }
    }
    console.log(req.body)
    next()
  },

  body('title', '书名不能为空').trim().isLength({ min: 1 }),
  body('author', '作者不能为空').trim().isLength({ min: 1 }),
  body('summary', '简介不能为空').trim().isLength({ min: 1 }),
  body('isbn', 'ISBN不能为空').trim().isLength({ min: 1 }),
  body('genre', '需选择至少一个类型').isLength({ min: 1 }),
  // TODO .trim()会把genre数组变为一个string，其值为第一个元素
  // sanitizeBody('*').trim().escape(),
  // sanitizeBody('genre.*').escape(),

  (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req)

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre
    })

    if (!errors.isEmpty()) {
      async.parallel({
        authors: function (callback) {
          Author.find(callback);
        },
        genres: function (callback) {
          Genre.find(callback);
        },
      }, function (err, results) {
        if (err) { return next(err); }
        for (let i = 0; i < results.genres.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) {
            results.genres[i].checked = 'true'
          }
        }
        res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres, book: book, errors: errors.array() });
      });
      return
    } else {
      book.save(function (err) {
        if (err) {
          return next(err)
        }
        res.redirect(book.url)
      })
    }
  }
]

exports.book_delete_get = (req, res) => {
  res.send('未实现：删除藏书')
}

exports.book_delete_post = (req, res) => {
  res.send('未实现：删除藏书')
}

exports.book_update_get = (req, res) => {
  res.send('未实现：更新藏书')
}

exports.book_update_post = (req, res) => {
  res.send('未实现：更新藏书')
}

exports.book_detail = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  async.parallel({
    book: (callback) => {
      Book.findById(id)
        .populate('author')
        .populate('genre')
        .exec(callback)
    },
    book_instance: (callback) => {
      BookInstance.find({ 'book': id })
        .exec(callback)
    }
  }, (err, results) => {
    if (err) {
      return next(err)
    }
    if (results.book == null) {
      const err = new Error('找不到该书籍')
      err.status = 404
      return next(err)
    }
    // res.json({
    //   title: results.book.title,
    //   book: results.book,
    //   book_instances: results.book_instance
    // })
    console.log(results.book_instance)
    res.render('book_detail', {
      title: results.book.title,
      book: results.book,
      book_instances: results.book_instance
    })
  })

}

exports.book_list = (req, res, next) => {
  Book.find({}, 'title author')
    .populate('author')
    .exec((err, books) => {
      if (err) {
        return next(err)
      }
      // res.json(books)
      res.render('book_list', { title: 'Book List', book_list: books })
    })
}
