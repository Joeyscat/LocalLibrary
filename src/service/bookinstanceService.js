const Bookinstance = require('../models/bookinstance')
const Book = require('../models/book')
const mongoose = require('mongoose')

exports.create = (req, resolve, reject) => {
  console.log(req.body)
  id = mongoose.Types.ObjectId(req.body.book._id)
  console.log(id)
  Book.findById(id).exec((err, book) => {
    if (err) {
      return reject(err)
    }
    console.log(book == null)
    if (book == null) {
      return reject({ msg: '找不到该书籍' })
    }
    const bookinstance = new Bookinstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back
    })
    bookinstance.save(function(err) {
      if (err) {
        return reject(err)
      }
      return resolve(bookinstance)
    })
  })
}

exports.delete = (id, resolve, reject) => {
  id = mongoose.Types.ObjectId(id)
  Bookinstance.findById(id, (err, bookinstance) => {
    if (err) {
      return reject(err)
    }
    if (bookinstance != null) {
      Bookinstance.findByIdAndRemove(id, err => {
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
  console.log(req.body)
  id = mongoose.Types.ObjectId(req.body._id)
  const bookinstance = new Bookinstance({
    _id: id,
    name: req.body.name
  })
  Bookinstance.findByIdAndUpdate(id, bookinstance, {}, function(
    err,
    modifiedbookinstance
  ) {
    if (err) {
      return reject(err)
    }
    if (modifiedbookinstance == null) {
      return reject({ msg: '找不到该书籍' })
    } else {
      resolve(modifiedbookinstance)
    }
  })
}

exports.detail = (id, resolve, reject) => {
  id = mongoose.Types.ObjectId(id)
  Bookinstance.findById(id, '-__v')
    .populate({
      path: 'book',
      select: '_id title summary isbn',
      populate: {
        path: 'genre author'
      }
    })
    .exec((err, bookinstance) => {
      if (err) {
        return reject(err)
      }
      if (bookinstance == null) {
        return reject({ err: '找不到该书籍' })
      }
      resolve(bookinstance)
    })
}

exports.list = (resolve, reject) => {
  Bookinstance.find({}, '-__v')
    .populate({
      path: 'book',
      select: '_id title',
      populate: {
        path: 'genre author'
      }
    })
    .exec((err, bookinstances) => {
      if (err) {
        return reject(err)
      }
      if (bookinstances == null) {
        reject({ err: '查询失败' })
      }
      resolve(bookinstances)
    })
}
