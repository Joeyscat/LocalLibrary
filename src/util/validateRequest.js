const { body, sanitizeBody } = require('express-validator');


exports.book_create_validate = [
  (req, res, next) => {
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
exports.book_update_validate = [
  ...this.book_create_validate,
  body('_id', '_id不能为空').trim().isLength({ min: 1 }),
  sanitizeBody('_id').trim().escape()
]

exports.author_create_validate = [
  body('first_name', '名字不能为空').trim().isLength({ min: 1 }),
  body('family_name', '姓氏不能为空').trim().isLength({ min: 1 }),

  sanitizeBody('first_name').trim().escape(),
  sanitizeBody('family_name').trim().escape(),
  sanitizeBody('date_of_birth').trim().escape(),
  sanitizeBody('date_of_death').trim().escape()
]

exports.author_update_validate = [
  body('_id', '_id不能为空').trim().isLength({ min: 1 }),
  body('first_name', '名字不能为空').trim().isLength({ min: 1 }),
  body('family_name', '姓氏不能为空').trim().isLength({ min: 1 }),

  sanitizeBody('_id').trim().escape(),
  sanitizeBody('first_name').trim().escape(),
  sanitizeBody('family_name').trim().escape(),
  sanitizeBody('date_of_birth').trim().escape(),
  sanitizeBody('date_of_death').trim().escape()
]

exports.genre_create_validate = [
  body('name', '类型名称不能为空').trim().isLength({ min: 1 }),

  sanitizeBody('name').trim().escape()
]


exports.genre_update_validate = [
  body('name', '类型名称不能为空').trim().isLength({ min: 1 }),
  body('_id', '_id不能为空').trim().isLength({ min: 1 }),

  sanitizeBody('name').trim().escape(),
  sanitizeBody('_id').trim().escape()
]

exports.bookinstance_create_validate = [
  body('book', '书籍不能为空').custom((book)=>{
    return Object.keys(book).length !== 0
  }),
  body('status', '状态不能为空').trim().isLength({ min: 1 }),
  body('imprint', '出版社不能为空').trim().isLength({ min: 1 }),
  body('due_back', '归还日期不能为空').isLength({ min: 1 }),

  sanitizeBody('status').trim().escape(),
  sanitizeBody('imprint').trim().escape(),
  sanitizeBody('due_back').trim().escape()
]
exports.bookinstance_update_validate = [
  ...this.bookinstance_create_validate,
  body('_id', '_id不能为空').trim().isLength({ min: 1 }),
  sanitizeBody('_id').trim().escape()
]
