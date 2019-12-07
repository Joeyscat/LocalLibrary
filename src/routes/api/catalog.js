const express = require('express')
const router = express.Router()
const validateRequest = require('../../util/validateRequest')

// 导入控制器模块
const book_controller = require('../../controllers/api/bookController')
const author_controller = require('../../controllers/api/authorController')
const genre_controller = require('../../controllers/api/genreController')
const book_instance_controller = require('../../controllers/api/bookinstanceController')

/// 藏书路由 ///

// 添加新的藏书
router.post(
  '/book',
  validateRequest.book_create_validate,
  book_controller.create
)

// 删除藏书
router.delete('/book/:id', book_controller.delete)

// 更新藏书
router.put(
  '/book',
  validateRequest.book_update_validate,
  book_controller.update
)

// 请求藏书
router.get('/book/:id', book_controller.detail)

// 藏书列表 + 条件查询
router.get('/book', book_controller.list)

/// AUTHOR ROUTES ///

// 添加新作者
router.post(
  '/author',
  validateRequest.author_create_validate,
  author_controller.create
)

// 删除作者
router.delete('/author/:id', author_controller.delete)

// 更新作者
router.put(
  '/author',
  validateRequest.author_update_validate,
  author_controller.update
)

// 请求作者详情
router.get('/author/:id', author_controller.detail)

// 请求所有作者
router.get('/authors', author_controller.list)

/// GENRE ROUTES ///

// 添加新的类型
router.post(
  '/genre',
  validateRequest.genre_create_validate,
  genre_controller.create
)

// 删除类型
router.delete('/genre/:id', genre_controller.delete)

// 更新类型
router.put(
  '/genre',
  validateRequest.genre_update_validate,
  genre_controller.update
)

// 类型详情
router.get('/genre/:id', genre_controller.detail)

// 所有类型
router.get('/genres', genre_controller.list)

/// BOOKINSTANCE ROUTES ///

// POST request for creating BookInstance.
router.post('/bookinstance', book_instance_controller.create)

// delete BookInstance.
router.delete('/bookinstance/:id', book_instance_controller.delete)

// POST request to update BookInstance.
router.put('/bookinstance', book_instance_controller.update)

// GET request for one BookInstance.
router.get('/bookinstance/:id', book_instance_controller.detail)

// GET request for list of all BookInstance.
router.get('/bookinstances', book_instance_controller.list)

module.exports = router
