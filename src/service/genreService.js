const Genre = require('../models/genre')
const mongoose = require('mongoose')

exports.create = (req, resolve, reject) => {
  const name = req.body.name;
  Genre.findOne({ name: name }, (err, genre) => {
    if (err) {
      return reject(err)
    } else {
      if (genre == null) {
        const genre = new Genre({
          name: name
        })

        genre.save(function (err) {
          if (err) {
            return reject(err)
          }
          resolve(genre)
        })
      } else {
        return reject({ msg: '已存在该类型-' + name })
      }
    }
  })
}

exports.delete = (id, resolve, reject) => {
  id = mongoose.Types.ObjectId(id)
  Genre.findById(id, (err, genre) => {
    if (err) {
      return reject(err)
    }
    if (genre != null) {
      Genre.findByIdAndRemove(id, err => {
        if (err) {
          return reject(err)
        }
        return resolve({ id })
      })
    } else {
      reject({ msg: '找不到该类型' })
    }
  })
}

exports.update = (req, resolve, reject) => {
  console.log(req.body)
  id = mongoose.Types.ObjectId(req.body._id)
  const genre = new Genre({
    _id: id,
    name: req.body.name
  })
  Genre.findByIdAndUpdate(id, genre, {}, function (err, modifiedgenre) {
    if (err) {
      return reject(err)
    }
    if (modifiedgenre == null) {
      return reject({ msg: '找不到该类型' })
    } else {
      resolve(modifiedgenre)
    }
  })
}

exports.detail = (id, resolve, reject) => {
  id = mongoose.Types.ObjectId(id)
  Genre.findById(id, '-__v')
    .exec((err, genre) => {
      if (err) {
        return reject(err)
      } else {
        resolve(genre)
      }
    })
}

exports.list = (resolve, reject) => {
  Genre.find({}, '-__v')
    .exec((err, genres) => {
      if (err) {
        return reject(err)
      } else {
        resolve(genres)
      }
    })
}
