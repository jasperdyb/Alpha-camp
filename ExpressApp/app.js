const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log(req)
  res.send(`The first express app , started by nodemon`)
})

app.get('/popular/:language', (req, res) => {
  console.log(req)
  let lan = req.params.language
  res.send(`${lan} is a popular language.`)
})

app.listen(port, () => {
  console.log(`express started`)
})