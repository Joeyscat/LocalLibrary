const Author = require('../models/author')
const mongoose = require('mongoose')

exports.create = (req, resolve, reject) => {
  const author = new Author({
    first_name: req.body.first_name,
    family_name: req.body.family_name,
    date_of_birth: req.body.date_of_birth,
    date_of_death: req.body.date_of_death
  })
  author.save(function(err) {
    if (err) {
      return reject(err)
    }
    resolve(author)
  })
}

exports.delete = (id, resolve, reject) => {
  id = mongoose.Types.ObjectId(id)
  Author.findById(id, (err, author) => {
    if (err) {
      return reject(err)
    }
    console.log('delete id ', id, ' author ', author)
    if (author != null) {
      return reject({ msg: '找不到该作者' })
    }

    Author.findByIdAndRemove(id, err => {
      if (err) {
        return reject(err)
      }
      return resolve({ id })
    })
  })
}

exports.update = (req, resolve, reject) => {
  id = mongoose.Types.ObjectId(req.body._id)
  const author = new Author({
    _id: id,
    first_name: req.body.first_name,
    family_name: req.body.family_name,
    date_of_birth: req.body.date_of_birth,
    date_of_death: req.body.date_of_death
  })

  Author.findByIdAndUpdate(id, author, {}, function(err, modifiedAuthor) {
    if (err) {
      return reject(err)
    }
    if (modifiedAuthor == null) {
      return reject({ msg: '找不到该作者' })
    }
    resolve(modifiedAuthor)
  })
}

exports.detail = (id, resolve, reject) => {
  id = mongoose.Types.ObjectId(id)
  Author.findById(id).exec((err, author) => {
    if (err) {
      return reject(err)
    }
    if (author == null) {
      return reject({ msg: '找不到该作者' })
    }
    resolve(author)
  })
}

exports.list = (resolve, reject) => {
  // TODO 将姓名拼接
  Author.find({}, '').exec((err, authors) => {
    if (err) {
      return reject(err)
    }
    resolve(authors)
  })
}
