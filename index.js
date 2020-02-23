const express = require('express');
const sqlite = require('sqlite3').verbose()
const app = express();
const pizzas = require('./routes/pizzas')

const {createDatabase} = require('./models/functions')

createDatabase()

const ordersRoute = require('./routes/orders')

app.use(express.json())
app.use('/orders',ordersRoute)
app.use('/pizzas',pizzas)

app.get('/',(req,res)=>{
    return res.send('<h1>hello world</h1>')
})

app.listen(3333)