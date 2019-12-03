const express = require('express')
const router = express.Router()

// 导入控制器模块
const book_controller = require('../../controllers/api/bookController')
// const author_controller = require('../../controllers/api/authorController')
// const genre_controller = require('../../controllers/api/genreController')
// const book_instance_controller = require('../../controllers/api/bookinstanceController')

/// 藏书路由 ///

// 添加新的藏书
// router.post('/book', book_controller.book_create)

// 删除藏书
// router.delete('/book/:id', book_controller.book_delete)

// 更新藏书
// router.put('/book/:id', book_controller.book_update)

// 请求藏书
router.get('/book/:id', book_controller.book_detail)

// 请求完整藏书列表
router.get('/books', book_controller.book_list)

/// AUTHOR ROUTES ///
/*
// creating Author.
router.post('/author', author_controller.author_create)

// delete Author.
router.delete('/author/:id', author_controller.author_delete)

// update Author.
router.put('/author/:id', author_controller.author_update)

// GET request for one Author.
router.get('/author/:id', author_controller.author_detail)

// GET request for list of all Authors.
router.get('/authors', author_controller.author_list)

/// GENRE ROUTES ///

// creating Genre.
router.post('/genre/create', genre_controller.genre_create)

// delete Genre.
router.delete('/genre/:id/delete', genre_controller.genre_delete)

// update Genre.
router.put('/genre/:id/update', genre_controller.genre_update)

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail)

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list)

/// BOOKINSTANCE ROUTES ///

// POST request for creating BookInstance.
router.post('/bookinstance', book_instance_controller.bookinstance_create)

// delete BookInstance.
router.delete('/bookinstance/:id', book_instance_controller.bookinstance_delete)

// POST request to update BookInstance.
router.put('/bookinstance/:id', book_instance_controller.bookinstance_update)

// GET request for one BookInstance.
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail)

// GET request for list of all BookInstance.
router.get('/bookinstances', book_instance_controller.bookinstance_list)
*/
module.exports = router
