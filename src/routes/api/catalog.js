const express = require('express')
const router = express.Router()
const {
  book_create_validate,
  book_update_validate,
  author_create_validate,
  author_update_validate,
  genre_create_validate,
  genre_update_validate,
  bookinstance_create_validate,
  bookinstance_update_validate
} = require('../../util/validateRequest')

// 导入控制器模块
const book_controller = require('../../controllers/api/bookController')
const author_controller = require('../../controllers/api/authorController')
const genre_controller = require('../../controllers/api/genreController')
const book_instance_controller = require('../../controllers/api/bookinstanceController')

/// 藏书路由 ///

// 添加新的藏书
router.post(
  '/books',
  book_create_validate,
  book_controller.create
)

// 删除藏书
router.delete('/books/:id', book_controller.delete)

// 更新藏书
router.put(
  '/books',
  book_update_validate,
  book_controller.update
)

// 请求藏书
router.get('/books/:id', book_controller.detail)

// 藏书列表 + 条件查询
router.get('/books', book_controller.list)

/// AUTHOR ROUTES ///

// 添加新作者
router.post(
  '/authors',
  author_create_validate,
  author_controller.create
)

// 删除作者
router.delete('/authors/:id', author_controller.delete)

// 更新作者
router.put(
  '/authors',
  author_update_validate,
  author_controller.update
)

// 请求作者详情
router.get('/authors/:id', author_controller.detail)

// 请求所有作者
router.get('/authors', author_controller.list)

// 请求所有作者(id+name)
router.get('/authorsName', author_controller.listName)

/// GENRE ROUTES ///

// 添加新的类型
router.post(
  '/genres',
  genre_create_validate,
  genre_controller.create
)

// 删除类型
router.delete('/genres/:id', genre_controller.delete)

// 更新类型
router.put(
  '/genres',
  genre_update_validate,
  genre_controller.update
)

// 类型详情
router.get('/genres/:id', genre_controller.detail)

// 所有类型
router.get('/genres', genre_controller.list)

/// 书籍实例路由 ///

// 新增书籍实例
router.post('/bookinstances', bookinstance_create_validate, book_instance_controller.create)

// 删除书籍实例
router.delete('/bookinstances/:id', book_instance_controller.delete)

// 更新书籍实例
router.put('/bookinstances', bookinstance_update_validate, book_instance_controller.update)

// 书籍实例详情
router.get('/bookinstances/:id', book_instance_controller.detail)

// 书籍实例列表
router.get('/bookinstances', book_instance_controller.list)

module.exports = router
