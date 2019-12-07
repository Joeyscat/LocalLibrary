const Author = require('../models/author')
const mongoose = require('mongoose')

exports.create = req => {
  return new Promise((resolve, reject) => {
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
  })
}

exports.delete = id => {
  return new Promise((resolve, reject) => {
    Author.findById(id, (err, result) => {
      if (err) {
        return reject(err)
      }
      if (result == null) {
        return reject({ msg: '找不到该作者 -', id })
      }
      Author.findByIdAndRemove(id, err => {
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
    const _id = req.body._id
    const author = {
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death
    }
    Author.findOne({ _id }, function(err, result) {
      if (err) {
        return reject(err)
      }
      if (!result) {
        return reject({ msg: '作者不存在-' + _id })
      }
      Author.updateOne({ _id }, author, {}, function(err, result) {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  })
}

exports.detail = id => {
  return new Promise((resolve, reject) => {
    Author.findById(id, '-__v').exec((err, res) => {
      if (err) {
        return reject(err)
      }
      if (res == null) {
        return reject({ msg: '找不到该作者' })
      }
      resolve(res)
    })
  })
}

exports.list = () => {
  // TODO 将姓名拼接
  return new Promise((resolve, reject) => {
    Author.find({}, '-__v').exec((err, genres) => {
      if (err) {
        return reject(err)
      }
      resolve(genres)
    })
  })
}
