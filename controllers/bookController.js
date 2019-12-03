const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookInstance = require('../models/bookinstance')
const mongoose = require('mongoose');

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
  res.send('未实现：添加新的藏书')
}

exports.book_create_post = (req, res) => {
  res.send('未实现：添加新的藏书')
}

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
