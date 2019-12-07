const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')

const async = require('async')

exports.create = req => {
  return new Promise((resolve, reject) => {
    const { title, author, summary, isbn, genre } = req.body
    authorIds = [author._id]
    genreIds = genre.map(g => g._id)
    async.parallel(
      {
        authors: function(callback) {
          Author.find({ _id: [authorIds] }, callback)
        },
        genres: function(callback) {
          Genre.find({ _id: [genreIds] }, callback)
        }
      },
      function(err, results) {
        if (err) {
          return reject(err)
        }
        if (results.authors.length == 0) {
          return reject({ msg: '作者不可用', author })
        }
        if (results.genres.length == 0) {
          return reject({ msg: '类型不可用', genre })
        }
        const book = new Book({
          title: title,
          author: author,
          summary: summary,
          isbn: isbn,
          genre: typeof genre === 'undefined' ? [] : genre
        })

        book.save(function(err) {
          if (err) {
            return reject(err)
          } else {
            return resolve(book)
          }
        })
      }
    )
  })
}

exports.delete = id => {
  return new Promise((resolve, reject) => {
    Book.findById(id, (err, result) => {
      if (err) {
        return reject(err)
      }
      if (!result) {
        return reject({ msg: '找不到该书籍', _id: id })
      }
      Book.findByIdAndRemove(id, err => {
        if (err) {
          return reject(err)
        }
        return resolve({ id })
      })
    })
  })
}

exports.update = req => {
  return new Promise((resolve, reject) => {
    const { _id, title, author, summary, isbn, genre } = req.body
    authorIds = [author._id]
    genreIds = genre.map(g => g._id)
    async.parallel(
      {
        book: function(callback) {
          Book.findById(_id).exec(callback)
        },
        authors: function(callback) {
          Author.find({ _id: [...authorIds] }, callback)
        },
        genres: function(callback) {
          Genre.find({ _id: [...genreIds] }, callback)
        }
      },
      function(err, results) {
        if (err) {
          return reject(err)
        }
        if (results.book == null) {
          return reject({ msg: '找不到该书籍', _id })
        }
        if (results.authors.length == 0) {
          return reject({ msg: '作者不可用', author })
        }
        if (results.genres.length == 0) {
          return reject({ msg: '类型不可用', genre })
        }
        const book = new Book({ _id, title, author, summary, isbn, genre })
        console.log(book)
        Book.findByIdAndUpdate(_id, book, {}, function(err, modifiedbook) {
          if (err) {
            return reject(err)
          }
          if (modifiedbook == null) {
            return reject({ msg: '找不到该书籍', _id })
          } else {
            resolve(modifiedbook)
          }
        })
      }
    )
  })
}

exports.detail = id => {
  return new Promise((resolve, reject) => {
    Book.findById(id)
      .populate('author')
      .populate('genre')
      .exec((err, result) => {
        if (err) {
          return reject(err)
        }
        if (result == null) {
          return reject({ msg: '找不到该书籍', id })
        }
        resolve(result)
      })
  })
}

exports.query = query => {
  return new Promise((resolve, reject) => {
    const { title, isbn } = query
    Book.find(query)
      .populate('author')
      .populate('genre')
      .exec((err, result) => {
        if (err) {
          return reject(err)
        }
        if (result == null) {
          return reject({ msg: '找不到该书籍', id })
        }
        resolve(result)
      })
  })
}

exports.list = () => {
  return new Promise((resolve, reject) => {
    Book.find({}, 'title author genre summary isbn')
      .populate('author', 'first_name family_name')
      .populate('genre', 'name')
      .exec((err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
  })
}
