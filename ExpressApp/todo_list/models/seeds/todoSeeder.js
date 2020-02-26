const mongoose = require('mongoose')
const Todo = require('../todo')

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true })

db = mongoose.connection

db.on('error', () => {
  console.log('Database connection error')
})

db.once('open', () => {
  console.log('database connected.')

  for (var i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }

  console.log('done')
})