const express = require('express');
const routes = express.Router()
const {index,store,show,update,destroy} = require('../controllers/orderController')

routes
    .get('/',index)
    .post('/',store)
    .get('/:id',show)
    .delete('/:id',destroy)
    .put('/:id',update)
    
module.exports = routes