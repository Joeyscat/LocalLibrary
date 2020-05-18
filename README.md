# LocalLibrary

#### 项目简介

。。。

#### 运行项目

1.  下载或克隆源码 https://gitee.com/Joeyscat/LocalLibrary.git
2.  项目根目录下执行 npm i
3.  npm run devstart

#### 项目结构

```bash
.
├── LICENSE
├── README.md
├── bin
│   └── www
├── package.json
├── populatedb.js
├── public
│   ├── images
│   │   └── avatar.gif
│   ├── javascripts
│   │   ├── bootstrap.min.js
│   │   └── jquery.min.js
│   └── stylesheets
│       ├── bootstrap.min.css
│       └── style.css
├── src
│   ├── app.js
│   ├── controllers
│   │   ├── api
│   │   │   ├── authorController.js
│   │   │   ├── bookController.js
│   │   │   ├── bookinstanceController.js
│   │   │   ├── genreController.js
│   │   │   └── responseBuilder.js
│   │   ├── authorController.js
│   │   ├── bookController.js
│   │   ├── bookinstanceController.js
│   │   └── genreController.js
│   ├── models
│   │   ├── author.js
│   │   ├── book.js
│   │   ├── bookinstance.js
│   │   └── genre.js
│   ├── plugins
│   │   └── mongoPlugin.js
│   ├── routes
│   │   ├── api
│   │   │   └── catalog.js
│   │   ├── catalog.js
│   │   ├── index.js
│   │   └── users.js
│   ├── secret.js
│   ├── service
│   │   ├── authorService.js
│   │   ├── bookService.js
│   │   ├── bookinstanceService.js
│   │   └── genreService.js
│   └── util
│       └── validateRequest.js
└── views
    ├── author_delete.pug
    ├── author_detail.pug
    ├── author_form.pug
    ├── author_list.pug
    ├── book_detail.pug
    ├── book_form.pug
    ├── book_list.pug
    ├── bookinstance_detail.pug
    ├── bookinstance_form.pug
    ├── bookinstance_list.pug
    ├── error.pug
    ├── genre_detail.pug
    ├── genre_form.pug
    ├── genre_list.pug
    ├── index.pug
    └── layout.pug

```
