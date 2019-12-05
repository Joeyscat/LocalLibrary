var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
const catalogRouter = require('./routes/catalog') // 导入 catalog 路由
const catalogApiRouter = require('./routes/api/catalog') // 导入 catalog api 路由
const mongoDBUri = require('./secret')

var app = express()

// Express 教程 3：使用数据库 (Mongoose)
// https://developer.mozilla.org/zh-CN/docs/learn/Server-side/Express_Nodejs/mongoose
// 导入 mongoose 模块
const mongoose = require('mongoose')

// 设置默认 mongoose 连接
mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise
// 取得默认连接
const db = mongoose.connection

// 将连接与错误事件绑定（以获得连接错误的提示）
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'))

// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/catalog', catalogRouter) // 将 catalog 路由添加进中间件链
app.use('/api/catalog', catalogApiRouter) // 将 catalog 路由添加进中间件链

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  console.error('ERROR -----> ', req.method, req.url)
  if (req.url.startsWith('/api/')) {
    res.json({ err })
  } else {
    res.render(err)
  }
})

module.exports = app
