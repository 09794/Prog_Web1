const express = require('express')
 const app = express()
 const port = 3000

 app.get('/index', (req, res) => {
     res.send('Erro')
 })

app.get('/about', (req, res) => {
    res.send('Hello World!')
     })

app.get('/users', (req, res) => {
    res.send('Hello World!')
      })

app.get('/contact', (req, res) => {
    res.send('Hello World!')
      })

app.get('/portifolio', (req, res) => {
     res.send('Hello World!')
     })

app.get('/sigup', (req, res) => {
    res.send('Hello World!')
    })

app.get('/sigin', (req, res) => {
    res.send('Hello World!')
    })

 app.listen(port, () => {
console.log(`Example app listening on
port ${port}`)
 })
