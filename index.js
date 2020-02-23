const express = require('express');
const app = express();

app.use(express.json())

app.get('/',(req,res)=>{
    return res.send('<h1>hello world</h1>')
})

app.listen(3333)