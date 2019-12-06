const Genre = require('../models/genre')
const mongoose = require('mongoose')

exports.create = req => {
  const name = req.body.name
  return new Promise((resolve, reject) => {
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
  // id = mongoose.Types.ObjectId(id)
  return new Promise((resolve, reject) => {
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
    id = mongoose.Types.ObjectId(req.body._id)
    const genre = new Genre({
      _id: id,
      name: req.body.name
    })
    // TODO 不可修改为已存在的类型
    Genre.findByIdAndUpdate(id, genre, {}, function(err, modifiedgenre) {
      if (err) {
        return reject(err)
      }
      if (modifiedgenre == null) {
        return reject({ msg: '找不到该类型' })
      }
      resolve(modifiedgenre)
    })
  })
}

exports.detail = id => {
  // id = mongoose.Types.ObjectId(id)
  return new Promise((resolve, reject) => {
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
