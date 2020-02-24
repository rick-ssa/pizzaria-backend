const express = require('express');
const routes = express.Router()
const {index,store,show,update} = require('../controllers/orderController')

routes
    .get('/',index)
    .post('/',store)
module.exports = routes