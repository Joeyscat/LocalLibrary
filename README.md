# LocalLibrary

#### 项目简介

基于 Express.js + MongoDB 的图书管理系统后台

[前台项目](https://github.com/Joeyscat/LocalLibraryClient.git)

#### 运行项目

```bash
$ git clone https://github.com/Joeyscat/LocalLibrary.git
$ cd LocalLibrary/
$ npm run start
```

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
