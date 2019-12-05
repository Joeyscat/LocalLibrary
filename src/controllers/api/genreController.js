const service = require('../../service/genreService')
const { validationResult } = require('express-validator');


exports.create = (req, res, next) => {
  const errors = validationResult(req)
  console.error(errors)

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  } else {
    const resolve = genre => {
      service.detail(genre._id, (genreDetail) => { return res.json(genreDetail) }, next)
    }
    service.create(req, resolve, next)
  }
}

exports.delete = (req, res, next) => {

  service.delete(req.params.id, (result) => {
    return res.json(result)
  }, next)
}

exports.update = (req, res, next) => {
  const errors = validationResult(req)
  console.error(errors)

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  } else {
    const resolve = genre => {
      service.detail(genre._id, (genreDetail) => { return res.json(genreDetail) }, next)
    }
    service.update(req, resolve, next)
  }
}

exports.detail = (req, res, next) => {

  service.detail(req.params.id, (genre) => {
    return res.json(genre)
  }, next)
}

exports.list = (req, res, next) => {

  service.list((genres) => {
    return res.json(genres)
  }, next)
}
