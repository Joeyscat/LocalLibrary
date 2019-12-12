const Genre = require('../models/genre')
const BookService = require('./bookService')

exports.create = req => {
  return new Promise((resolve, reject) => {
    const name = req.body.name
    Genre.findOne({name: name}, (err, result) => {
      if (err) {
        return reject(err)
      }
      if (result) {
        return reject('已存在该类型-' + name)
      }
      genre = new Genre({
        name: name
      })

      genre.save(function (err) {
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
    Genre.findById(id, (err, result) => {
      if (err) {
        return reject(err)
      }
      if (result == null) {
        return reject('找不到该类型')
      }
      BookService.count({genre: result}).then(count => {
        if (count > 0) {
          return reject('库中存在该类型书籍，无法删除')
        }
        Genre.findByIdAndRemove(id, err => {
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
    const _id = req.body._id
    const name = req.body.name
    Genre.findOne({name}, function (err, genre) {
      if (err) {
        return reject(err)
      }
      if (genre) {
        return reject('已存在该类型-' + name)
      }
      Genre.updateOne({_id}, {name}, {}, function (err, result) {
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
    Genre.findById(id, '-__v').exec((err, result) => {
      if (err) {
        return reject(err)
      }
      if (result == null) {
        return reject('找不到该类型-' + id)
      }
      resolve(result)
    })
  })
}

exports.list = query => {
  return new Promise((resolve, reject) => {
    let {name, page, limit} = query
    console.log(query)
    page = page ? page : 1
    limit = limit ? limit : 10
    let query_ = {}
    let like = []
    if (name) {
      like.push({name: {$regex: new RegExp(name, 'i')}})
      query_.$or = like
    }
    Genre.find(query_, '-__v')
      .skip(+(page - 1) * limit)
      .limit(+limit)
      .exec((err, result) => {
        if (err) {
          return reject(err)
        }
        Genre.count(query_, function (err, count) {
          if (err) {
            return reject(err)
          }
          resolve({items: result, total: count})
        })
      })
  })
}
