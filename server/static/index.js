// Routes for static files
const resolve = require('path').resolve
const express = require('express')
const Router = express.Router()

Router.use('/', express.static(resolve(__dirname, './files')))

module.exports = Router
