const { body, sanitizeBody } = require('express-validator');


exports.book_update_validate = [
  (req, res, next) => {
    console.log('validate ' + req.url)
    let genre = req.body.genre
    if (!(genre instanceof Array)) {
      if (typeof genre === 'undefined') {
        req.body.genre = []
      } else {
        req.body.genre = new Array(genre)
      }
    }
    next()
  },

  body('title', '书名不能为空').trim().isLength({ min: 1 }),
  body('summary', '简介不能为空').trim().isLength({ min: 1 }),
  body('isbn', 'ISBN不能为空').trim().isLength({ min: 1 }),
  body('author', '作者不能为空').isLength({ min: 1 }),
  body('genre', '需选择至少一个类型').isLength({ min: 1 }),

  sanitizeBody('title').trim().escape(),
  sanitizeBody('summary').trim().escape(),
  sanitizeBody('isbn').trim().escape()
]