const express = require('express')
const movieApp = express()

const port = 3000

const handledbars = require('express-handlebars')

const movieList = require('./movies.json')

movieApp.engine('handlebars', handledbars({ defaultLayout: 'main' }))
movieApp.set('view engine', 'handlebars')

// setting static files
movieApp.use(express.static('public'))

movieApp.get('/', (req, res) => {
  // res.send(`server started`)
  // const numberList = [1, 2, 3, 4, 5, 6, 7, 8]
  // res.render('index')
  // res.render('index', { numbers: numberList })


  // past the movie data into 'index' partial template
  res.render('index', { movies: movieList.results })
})

movieApp.get('/movies/:movie_id', (req, res) => {
  // const movie = movieList.results.filter(movie => movie.id == req.params.movie_id)
  // res.render('show', { movie: movie[0] })

  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movie: movie })
})

movieApp.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movies: movies, keyword: keyword })
})

movieApp.listen(port, () => {
  console.log(`server started.`)
})
