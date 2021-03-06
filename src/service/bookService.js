const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookinstanceService = require('./bookinstanceService')

const async = require('async')

exports.create = req => {
  return new Promise((resolve, reject) => {
    const {title, author, summary, isbn, genre} = req.body
    const authorIds = [author._id]
    const genreIds = genre.map(g => g._id)
    async.parallel(
      {
        authors: function (callback) {
          Author.find({_id: [authorIds]}, callback)
        },
        genres: function (callback) {
          Genre.find({_id: {$in: [...genreIds]}}, callback)
        }
      },
      function (err, results) {
        if (err) {
          return reject(err)
        }
        if (results.authors.length === 0) {
          return reject({msg: '作者不可用', author})
        }
        if (results.genres.length === 0) {
          return reject({msg: '类型不可用', genre})
        }
        const book = new Book({
          title: title,
          author: author,
          summary: summary,
          isbn: isbn,
          genre: typeof genre === 'undefined' ? [] : genre
        })

        book.save(function (err) {
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
        return reject(`找不到该书籍 ${id}`)
      }
      BookinstanceService.count({book: result}).then(count => {
        if (count > 0) {
          return reject('该书籍已有库存，无法删除')
        }
        Book.findByIdAndRemove(id, err => {
          if (err) {
            return reject(err)
          }
          return resolve({id})
        })
      }).catch(err => reject(err))
    })
  })
}

exports.update = req => {
  return new Promise((resolve, reject) => {
    const {_id, title, author, summary, isbn, genre} = req.body
    const authorIds = [author._id]
    const genreIds = genre.map(g => g._id)
    async.parallel(
      {
        book: function (callback) {
          Book.findById(_id).exec(callback)
        },
        authors: function (callback) {
          Author.find({_id: [...authorIds]}, callback)
        },
        genres: function (callback) {
          Genre.find({_id: [...genreIds]}, callback)
        }
      },
      function (err, results) {
        if (err) {
          return reject(err)
        }
        if (results.book == null) {
          return reject(`找不到该书籍 ${_id}`)
        }
        if (results.authors.length === 0) {
          return reject({msg: '作者不可用', author})
        }
        if (results.genres.length === 0) {
          return reject({msg: '类型不可用', genre})
        }
        const book = new Book({_id, title, author, summary, isbn, genre})
        console.log(book)
        Book.findByIdAndUpdate(_id, book, {}, function (err, modifiedbook) {
          if (err) {
            return reject(err)
          }
          if (modifiedbook == null) {
            return reject(`找不到该书籍 ${_id}`)
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
          return reject(`找不到该书籍 ${id}`)
        }
        resolve(result)
      })
  })
}

exports.list = query => {
  return new Promise((resolve, reject) => {
    const { page, limit, match } = buildQuery(query)
    Book.find(match, 'title author genre summary isbn')
      .populate('author', 'first_name family_name')
      .populate('genre', 'name')
      .skip(+(page - 1) * limit)
      .limit(+limit)
      .exec((err, result) => {
        if (err) {
          return reject(err)
        }
        Book.count(match, function (err, count) {
          if (err) {
            return reject(err)
          }
          resolve({items: result, total: count})
        })
      })
  })
}

exports.count = query => {
  return new Promise((resolve, reject) => {
    Book.count(query, function (err, count) {
      if (err) {
        return reject(err)
      }
      resolve(count)
    })
  })
}

exports.simpleList = query => {
  return new Promise((resolve, reject) => {
    const { page, limit, match } = buildQuery(query)
    Book.find(match, 'title author')
      .populate('author', 'first_name family_name')
      .skip(+(page - 1) * limit)
      .limit(+limit)
      .exec((err, result) => {
        if (err) {
          return reject(err)
        }
        resolve({ items: result})
      })
  })
}

const buildQuery = (query) => {
  let { title, isbn, page, limit } = query
  page = page ? page : 1
  limit = limit ? limit : 10
  let match = {}
  let like = []
  if (title) {
    like.push({ title: { $regex: new RegExp(title, 'i') } })
    match.$or = like
  }
  if (isbn) {
    match.isbn = isbn
  }
  return { page, limit, match }
}

exports.module = this
