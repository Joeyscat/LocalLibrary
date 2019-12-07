const Genre = require('../models/genre')
const mongoose = require('mongoose')

exports.create = req => {
  return new Promise((resolve, reject) => {
    const name = req.body.name
    Genre.findOne({ name: name }, (err, genre) => {
      if (err) {
        return reject(err)
      }
      if (genre != null) {
        return reject({ msg: '已存在该类型-' + name })
      }
      genre = new Genre({
        name: name
      })

      genre.save(function(err) {
        if (err) {
          return reject(err)
        }
        resolve(genre)
      })
    })
  })
}

exports.delete = id => {
  return new Promise((resolve, reject) => {
    // id = mongoose.Types.ObjectId(id)
    Genre.findById(id, (err, genre) => {
      if (err) {
        return reject(err)
      }
      if (genre == null) {
        return reject({ msg: '找不到该类型' })
      }
      Genre.findByIdAndRemove(id, err => {
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
    const _id = mongoose.Types.ObjectId(req.body._id)
    const name = req.body.name
    // TODO 不可修改为已存在的类型
    Genre.findOne({ name }, function(err, genre) {
      if (err) {
        return reject(err)
      }
      if (genre) {
        return reject({ msg: '已存在该类型-' + name })
      }
      Genre.updateOne({ _id }, { name }, {}, function(err, result) {
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
    // id = mongoose.Types.ObjectId(id)
    Genre.findById(id, '-__v').exec((err, genre) => {
      if (err) {
        return reject(err)
      }
      resolve(genre)
    })
  })
}

exports.list = () => {
  return new Promise((resolve, reject) => {
    Genre.find({}, '-__v').exec((err, genres) => {
      if (err) {
        return reject(err)
      }
      resolve(genres)
    })
  })
}
