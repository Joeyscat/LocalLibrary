const Author = require('../models/author');
const Book = require('../models/book');
const async = require('async')
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

// 显示完整的作者列表
exports.author_list = (req, res, next) => {
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) { return next(err); }
      // res.json(list_authors)
      res.render('author_list', { title: 'Author List', author_list: list_authors });
    });
};

// 为每位作者显示详细信息的页面
exports.author_detail = (req, res, next) => {
  const id = req.params.id
  async.parallel({
    author: (callback) => {
      Author.findById(id)
        .exec(callback)
    },

    author_books: (callback) => {
      Book.find({ 'author': id }, 'title summary')
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    if (results.author == null) {
      const err = new Error('找不到该作者')
      err.status = 404
      return next(err)
    }
    // res.json({ title: 'Author Detail', author: results.author, author_books: results.author_books });
    res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.author_books });
  })
};

// 由 GET 显示创建作者的表单
exports.author_create_get = (req, res, next) => { res.render('author_form', { title: 'Create Author' }) };

// 由 POST 处理作者创建操作
exports.author_create_post = [
  body('first_name').trim().isLength({ min: 1 }).withMessage('名字不能为空'),
  body('family_name').trim().isLength({ min: 1 }).withMessage('姓氏不能为空'),
  body('date_of_birth', '该日期不可用').optional({ checkFalsy: true }).isISO8601(),
  body('date_of_death', '该日期不可用').optional({ checkFalsy: true }).isISO8601(),

  sanitizeBody('first_name').trim().escape(),
  sanitizeBody('family_name').trim().escape(),
  sanitizeBody('date_of_birth'),
  sanitizeBody('date_of_death'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      console.log('body校验异常', req.body)
      res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() })
      return
    } else {
      var author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death
      })

      author.save(function (err) {
        if (err) { return next(err) }
        res.redirect(author.url)
      })
    }
  }
]

// 由 GET 显示删除作者的表单
exports.author_delete_get = (req, res, next) => {

  async.parallel({
    author: function (callback) {
      Author.findById(req.params.id).exec(callback)
    },
    author_books: function (callback) {
      Book.find({ 'author': req.params.id }).exec(callback)
    }
  }, function (err, results) {
    if (err) { return next(err) }
    if (results.author == null) {
      res.redirect('/catalog/authors')
    }
    res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.author_books })
  })
};

// 由 POST 处理作者删除操作
exports.author_delete_post = (req, res) => {

  async.parallel({
    author: function (callback) {
      Author.findById(req.body.authorid).exec(callback)
    },
    authors_books: function (callback) {
      Book.find({ 'author': req.body.authorid }).exec(callback)
    },
  }, function (err, results) {
    if (err) { return next(err); }
    // Success
    if (results.authors_books.length > 0) {
      // Author has books. Render in same way as for GET route.
      res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books });
      return;
    }
    else {
      // Author has no books. Delete object and redirect to the list of authors.
      Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
        if (err) { return next(err); }
        // Success - go to author list
        res.redirect('/catalog/authors')
      })
    }
  });
};

// 由 GET 显示更新作者的表单
exports.author_update_get = (req, res) => { res.send('未实现：作者更新表单的 GET'); };

// 由 POST 处理作者更新操作
exports.author_update_post = (req, res) => { res.send('未实现：更新作者的 POST'); };