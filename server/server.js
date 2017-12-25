const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(favicon(path.join(__dirname, '../favicon.ico')))
//
//错误处理
app.use(function(err, req, res, next) {
  console.log(err)
  res.status(500).send(err)
})

app.listen(3333, function() {
  console.log(`server is listening on port 3333`)
})
