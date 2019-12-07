const Bookinstance = require('../models/bookinstance')
const Book = require('../models/book')

exports.create = req => {
  return new Promise((resolve, reject) => {
    const { book, imprint, status, due_back } = req.body
    Book.findById(book._id).exec((err, result) => {
      if (err) {
        return reject(err)
      }
      if (result == null) {
        return reject({ msg: '找不到该书籍', _id: book._id })
      }
      const bookinstance = new Bookinstance({
        book,
        imprint,
        status,
        due_back
      })
      bookinstance.save(function(err) {
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
        return reject({ msg: '找不到该书籍', _id: id })
      }
      Bookinstance.findByIdAndRemove(id, err => {
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
    const { _id, book, imprint, status, due_back } = req.body
    Book.findById(book._id).exec((err, result) => {
      if (err) {
        return reject(err)
      }
      if (result == null) {
        return reject({ msg: '找不到该书籍', _id: book._id })
      }
      const bookinstance = new Bookinstance({
        _id,
        book,
        imprint,
        status,
        due_back
      })
      Bookinstance.findByIdAndUpdate(_id, bookinstance, {}, function(
        err,
        modifiedbookinstance
      ) {
        if (err) {
          return reject(err)
        }
        if (modifiedbookinstance == null) {
          return reject({ msg: '找不到该书籍' })
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
          return reject({ err: '找不到该书籍' })
        }
        resolve(result)
      })
  })
}

exports.list = () => {
  return new Promise((resolve, reject) => {
    Bookinstance.find({}, '-__v')
      .populate({
        path: 'book',
        select: '_id title',
        populate: {
          path: 'genre author'
        }
      })
      .exec((err, result) => {
        if (err) {
          return reject(err)
        }

        return resolve(result)
      })
  })
}
