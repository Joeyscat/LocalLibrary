const Author = require('../models/author')
const BookService = require('./bookService')

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
        return reject(`找不到该作者- ${id}`)
      }
      BookService.count({ author: result })
        .then(count => {
          if (count > 0) {
            return reject('库中存在该作者的书籍，无法删除')
          }
          Author.findByIdAndRemove(id, err => {
            if (err) {
              return reject(err)
            }
            return resolve({ id })
          })
        })
        .catch(err => reject(err))
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
        return reject('作者不存在-' + _id)
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
    Author.findById(id, '-__v').exec((err, result) => {
      if (err) {
        return reject(err)
      }
      if (result == null) {
        return reject(`找不到该作者 ${id}`)
      }
      resolve(result)
    })
  })
}

exports.list = query => {
  return new Promise((resolve, reject) => {
    let { page, limit } = query
    console.log(query)
    page = page ? page : 1
    limit = limit ? limit : 100
    let query_ = {}
    Author.find(query_, '-__v')
      .skip(+(page - 1) * limit)
      .limit(+limit)
      .exec((err, result) => {
        if (err) {
          return reject(err)
        }
        Author.count(query_, function(err, count) {
          if (err) {
            return reject(err)
          }
          resolve({ items: result, total: count })
        })
      })
  })
}

exports.listName = query => {
  return new Promise((resolve, reject) => {
    let { name, page, limit } = query
    console.log(query)
    page = page ? page : 1
    limit = limit ? limit : 100
    let match = {}
    let like = []
    if (name) {
      like.push({ name: { $regex: new RegExp(name, 'i') } })
      match.$or = like
    }
    // http://www.uwenku.com/question/p-gmmzqtug-rr.html
    Author.aggregate([
      { $project: { name: { $concat: ['$family_name', '$first_name'] } } },
      { $match: match },
      { $skip: +(page - 1) * limit },
      { $limit: +limit }
    ]).exec((err, result) => {
      if (err) {
        return reject(err)
      }
      Author.count(match, function(err, count) {
        if (err) {
          return reject(err)
        }
        console.log({ items: result, total: count })
        resolve({ items: result, total: count })
      })
    })
  })
}
