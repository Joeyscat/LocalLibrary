const service = require('../../service/bookinstanceService')
const { validationResult } = require('express-validator')

exports.create = (req, res, next) => {
  const errors = validationResult(req)
  console.error(errors)

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() })
  } else {
    const resolve = bookinstance => {
      res.json(bookinstance)
    }
    service.create(req, resolve, next)
  }
}

exports.delete = (req, res, next) => {
  service.delete(
    req.params.id,
    result => {
      return res.json(result)
    },
    next
  )
}

exports.update = (req, res, next) => {
  const errors = validationResult(req)
  console.error(errors)

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  } else {
    const resolve = bookinstance => {
      service.detail(
        bookinstance._id,
        bookinstanceDetail => {
          return res.json(bookinstanceDetail)
        },
        next
      )
    }
    service.update(req, resolve, next)
  }
}

exports.detail = (req, res, next) => {
  service.detail(
    req.params.id,
    bookinstance => {
      return res.json(bookinstance)
    },
    next
  )
}

exports.list = (req, res, next) => {
  service.list(bookinstances => {
    return res.json(bookinstances)
  }, next)
}
