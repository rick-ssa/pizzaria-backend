const express = require('express')
const routes = express.Router()
const {store,index,show,destroy,update} = require('../controllers/pizzaController')

routes
    .get('/', index)
    .post('/', store)
    .get('/:id', show)
    .delete('/:id',destroy)
    .put('/:id',update)

module.exports = routes