const BookInstance = require('../models/bookinstance')
const Book = require('../models/book')
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// 显示完整的书籍实例列表
exports.bookinstance_list = function (req, res, next) {
  BookInstance.find()
    .populate('book')
    .exec(function (err, list_bookinstances) {
      if (err) { return next(err); }
      // res.json(list_bookinstances)
      res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
    });
};


// exports.bookinstance_list = (req, res) => { res.send('未实现：书籍实例列表'); };

// 为每本书籍实例显示详细信息的页面
exports.bookinstance_detail = (req, res) => {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookinstance) {
      if (err) { return next(err); }
      if (bookinstance == null) {
        var err = new Error('Book copy not found');
        err.status = 404;
        return next(err);
      }
      res.render('bookinstance_detail', { title: 'Book:', bookinstance: bookinstance });
    })
};

// 由 GET 显示创建书籍实例的表单
exports.bookinstance_create_get = (req, res) => {
  Book.find({}, 'title')
    .exec(function (err, books) {
      if (err) { return next(err); }
      res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books });
    });
};

// 由 POST 处理书籍实例创建操作
exports.bookinstance_create_post = [
  body('book', 'Book must be specified').trim().isLength({ min: 1 }),
  body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),

  // TODO 当status项选择了[可供借阅]之外的状态，due_back是必需项

  sanitizeBody('book').trim().escape(),
  sanitizeBody('imprint').trim().escape(),
  sanitizeBody('status').trim().escape(),
  sanitizeBody('due_back').toDate(),

  (req, res, next) => {

    const errors = validationResult(req);

    var bookinstance = new BookInstance(
      {
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back
      });

    if (!errors.isEmpty()) {
      Book.find({}, 'title')
        .exec(function (err, books) {
          if (err) { return next(err); }
          res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books, selected_book: bookinstance.book._id, errors: errors.array(), bookinstance: bookinstance });
        });
      return;
    }
    else {
      bookinstance.save(function (err) {
        if (err) { return next(err); }
        res.redirect(bookinstance.url);
      });
    }
  }
]

// 由 GET 显示删除书籍实例的表单
exports.bookinstance_delete_get = (req, res) => { res.send('未实现：书籍实例删除表单的 GET'); };

// 由 POST 处理书籍实例删除操作
exports.bookinstance_delete_post = (req, res) => { res.send('未实现：删除书籍实例的 POST'); };

// 由 GET 显示更新书籍实例的表单
exports.bookinstance_update_get = (req, res) => { res.send('未实现：书籍实例更新表单的 GET'); };

// 由 POST 处理书籍实例更新操作
exports.bookinstance_update_post = (req, res) => { res.send('未实现：更新书籍实例的 POST'); };