const express = require('express');
const app = express();
const pizzas = require('./routes/pizzas')
const orders = require('./routes/orders')

const {createDatabase} = require('./models/functions')

createDatabase()

app.use(express.json())
app.use('/orders',orders)
app.use('/pizzas',pizzas)

app.listen(3333)