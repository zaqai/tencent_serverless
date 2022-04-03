const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const Redis = require('ioredis')
const redisConfig = {
  port: 39120,
  host: '8.140.166.149',
  password: 'jamay',
  db: 0,
}
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const client = new Redis(redisConfig)
let data = ''
// Routes
app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

let key = ''
app.get('/jamay', async (req, res) => {
  key = req.path.slice(1)
  data = await client.get(key)
  res.send(data)
})

app.get('/user', (req, res) => {
  res.send([
    {
      title: 'stestk',
      link: 'https://serverless.com'
    }
  ])
})

app.get('/user/:id', (req, res) => {
  const id = req.params.id
  res.send({
    id: id,
    title: 'serverless framework',
    link: 'https://serverless.com'
  })
})

app.get('/404', (req, res) => {
  res.status(404).send('Not found')
})

app.get('/500', (req, res) => {
  res.status(500).send('Server Error')
})

// Error handler
app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).send('Internal Serverless Error')
})

app.listen(8080)

module.exports = app
