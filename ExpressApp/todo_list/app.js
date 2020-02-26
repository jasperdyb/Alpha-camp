const express = require('express')
const app = express()
const mongoose = require('mongoose')                    // 載入 mongoose
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true })   // 設定連線到 mongoDB

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 載入 todo model
const Todo = require('./models/todo')

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//模板載入
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .exec((err, todos) => { // 把 Todo model 所有的資料都抓回來
      if (err) return console.error(err)
      // console.log(todos)
      return res.render('index', { todos: todos }) // 將資料傳給 index 樣板
    })
})
// 列出全部 Todo
app.get('/todos', (req, res) => {
  return res.redirect('/')
})
// 新增一筆 Todo 頁面
app.get('/todos/new', (req, res) => {
  // res.send('新增 Todo 頁面')
  return res.render('new')
})
// 顯示一筆 Todo 的詳細內容
app.get('/todos/:id', (req, res) => {
  // res.send('顯示 Todo 的詳細內容')
  Todo.findById(req.params.id)
    .lean()
    .exec((err, todo) => {
      if (err) return console.error(err)
      return res.render('detail', { todo: todo })
    })

})
// 新增一筆  Todo
app.post('/todos', (req, res) => {
  // res.send('建立 Todo')
  const todo = new Todo({
    name: req.body.name,    // name 是從 new 頁面 form 傳過來
  })
  // 存入資料庫
  todo.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')  // 新增完成後，將使用者導回首頁
  })
})
// 修改 Todo 頁面
app.get('/todos/:id/edit', (req, res) => {
  // res.send('修改 Todo 頁面')
  Todo.findById(req.params.id)
    .lean()
    .exec((err, todo) => {
      if (err) return console.error(err)
      return res.render('edit', { todo: todo })
    })

})
// 修改 Todo
app.post('/todos/:id/edit', (req, res) => {
  // res.send('修改 Todo')
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.name = req.body.name
    todo.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/todos/${req.params.id}`)
    })
  })
})
// 刪除 Todo
app.post('/todos/:id/delete', (req, res) => {
  // res.send('刪除 Todo')
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

app.listen(3000, () => {
  console.log('App is running!')
})