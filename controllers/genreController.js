const Genre = require('../models/genre')
const Book = require('../models/book')
const async = require('async')

// 显示完整的类型列表
exports.genre_list = (req, res, next) => {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec((err, genres) => {
      if (err) { return next(err); }
      // res.json(genres)
      res.render('genre_list', { title: 'Genre List', genre_list: genres });
    });
};

// 为每个类型显示详细信息的页面
exports.genre_detail = (req, res, next) => {
  async.parallel({
    genre: (callback) => {
      Genre.findById(req.params.id)
        .exec(callback)
    },

    genre_books: (callback) => {
      Book.find({ 'genre': req.params.id })
        .exec(callback)
    }
  }, (err, results) => {
    if (err) {
      return next(err)
    }
    if (results.genre == null) {
      const err = new Error('找不到该类型')
      err.status = 404
      return next(err)
    }
    // res.json({ title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books })
    res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books })
  })
};

// 由 GET 显示创建类型的表单
exports.genre_create_get = (req, res) => { res.send('未实现：类型创建表单的 GET'); };

// 由 POST 处理类型创建操作
exports.genre_create_post = (req, res) => { res.send('未实现：创建类型的 POST'); };

// 由 GET 显示删除类型的表单
exports.genre_delete_get = (req, res) => { res.send('未实现：类型删除表单的 GET'); };

// 由 POST 处理类型删除操作
exports.genre_delete_post = (req, res) => { res.send('未实现：删除类型的 POST'); };

// 由 GET 显示更新类型的表单
exports.genre_update_get = (req, res) => { res.send('未实现：类型更新表单的 GET'); };

// 由 POST 处理类型更新操作
exports.genre_update_post = (req, res) => { res.send('未实现：更新类型的 POST'); };