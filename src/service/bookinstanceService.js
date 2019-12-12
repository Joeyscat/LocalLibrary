const Bookinstance = require('../models/bookinstance')
const Book = require('../models/book')

exports.create = req => {
  return new Promise((resolve, reject) => {
    const {book, imprint, status, due_back} = req.body
    Book.findById(book._id).exec((err, result) => {
      if (err) {
        return reject(err)
      }
      if (result == null) {
        return reject(`找不到该书籍 ${book._id}`)
      }
      const bookinstance = new Bookinstance({
        book,
        imprint,
        status,
        due_back
      })
      bookinstance.save(function (err) {
        if (err) {
          return reject(err)
        }
        return resolve(bookinstance)
      })
    })
  })
}

exports.delete = id => {
  return new Promise((resolve, reject) => {
    Bookinstance.findById(id, (err, result) => {
      if (err) {
        return reject(err)
      }
      if (!result) {
        return reject(`找不到该书籍 ${id}`)
      }
      Bookinstance.findByIdAndRemove(id, err => {
        if (err) {
          return reject(err)
        }
        return resolve({id})
      })
    })
  })
}

exports.update = req => {
  return new Promise((resolve, reject) => {
    const {_id, book, imprint, status, due_back} = req.body
    Book.findById(book._id).exec((err, result) => {
      if (err) {
        return reject(err)
      }
      if (result == null) {
        return reject(`找不到该书籍 ${book._id}`)
      }
      const bookinstance = new Bookinstance({
        _id,
        book,
        imprint,
        status,
        due_back
      })
      Bookinstance.findByIdAndUpdate(_id, bookinstance, {}, function (
        err,
        modifiedbookinstance
      ) {
        if (err) {
          return reject(err)
        }
        if (modifiedbookinstance == null) {
          return reject(`找不到该书籍 ${_id}`)
        }
        resolve(modifiedbookinstance)
      })
    })
  })
}

exports.detail = id => {
  return new Promise((resolve, reject) => {
    Bookinstance.findById(id, '-__v')
      .populate({
        path: 'book',
        select: '_id title summary isbn',
        populate: {
          path: 'genre author'
        }
      })
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
    let {title, isbn, page, limit} = query
    page = page ? page : 1
    limit = limit ? limit : 10
    Bookinstance.find({}, '-__v')
      .populate({
        path: 'book',
        select: '_id title',
        populate: {
          path: 'genre author'
        }
      })
      .skip(+(page - 1) * limit)
      .limit(+limit)
      .exec((err, result) => {
        if (err) {
          return reject(err)
        }
        Bookinstance.count({}, function (err, count) {
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
    Bookinstance.count(query, function (err, count) {
      if (err) {
        return reject(err)
      }
      resolve(count)
    })
  })
}

exports.module = this
