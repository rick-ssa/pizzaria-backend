const sqlite = require('sqlite3').verbose()
const {databaseName,openDataBase,closeDataBase} = require('../models/databaseSctruture')

const controller = {
    store:  (req,res) => {
        let db = openDataBase(databaseName,sqlite.OPEN_READWRITE)
        
        let pizza = req.body
    
        db.run('INSERT INTO pizzas(name,price,ingredients) VALUES(?,?,?)',[pizza.name, pizza.price, pizza.ingredients ? pizza.ingredients.join(','): ''], function(err){
            if(err){
                return console.error(err)
            }

            return res.sendStatus(200)
        })
    
        closeDataBase(db)
    
    },

    index: (req,res) => {
        let db = openDataBase(databaseName,sqlite.OPEN_READONLY)

        db.all('SELECT * FROM pizzas',(err,rows)=>{
            return res.send(rows.map(row=>{
                if(row.ingredients) {
                    return {...row, ingredients: row.ingredients.split(',')}
                }

                return {...row,ingredients:[]}
            }))
        })

        closeDataBase(db)
    },

    show: (req,res) => {
        let db = openDataBase(databaseName,sqlite.OPEN_READONLY)

        db.get('SELECT * FROM pizzas WHERE rowid = ?',[req.params.id],(err,row)=>{
            if(row){
                if(row.ingredients) {
                    return res.send(row)
                }
                return res.send({...row, ingredients:[]})
            }

            return res.sendStatus(204)
        })

        closeDataBase(db)
    },

    destroy: (req,res) => {
        const {id} = req.params

        let db = openDataBase(databaseName,sqlite.OPEN_READWRITE)

        db.run('DELETE FROM pizzas WHERE rowid = ?',[id],(err)=>{
            if(!err) {
               return res.sendStatus(200)
            }
        })
        closeDataBase(db)
    },

    update: (req,res) => {
        let db = openDataBase(databaseName,sqlite.OPEN_READWRITE)
        let {id} = req.params
        let pizza = req.body
        db.run('UPDATE pizzas SET name = ?, price = ?, ingredients = ? WHERE rowid = ?',
                [pizza.name,pizza.price,pizza.ingredients ? pizza.ingredients : '',id],
                (err)=> {
                    if(!err) {
                        return res.sendStatus(200)
                    }
                })
        closeDataBase(db)
    }

}

module.exports = controller

