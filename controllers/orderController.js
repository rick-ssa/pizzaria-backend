const sqlite = require('sqlite3').verbose()
const {databaseName,openDataBase,closeDataBase} = require('../models/databaseSctruture')

const controller = {
    index: (req, res)=>{
        let db = openDataBase(databaseName,sqlite.OPEN_READONLY)

        db.all('SELECT rowid,* FROM orders',(err,rows)=>{
            if(err) {
                return console.log(err)
            }
            res.send(rows.map(row=>({id: row.rowid, items: JSON.parse(row.items)})))

        }) 

        closeDataBase(db)
    },

    store: (req,res)=>{
        let db = openDataBase(databaseName,sqlite.OPEN_READWRITE)

        let order = req.body
        db.run('INSERT INTO orders(items) VALUES(?)',[JSON.stringify(order.items)],function(err){
            if(err) {
                return console.log(err)
            }

            res.send({id: this.lastID})
        })

        closeDataBase(db)
    },
    show: (req,res) => {
        let db = openDataBase(databaseName,sqlite.OPEN_READONLY)

        let {id} = req.params

        db.get('SELECT rowid, * FROM orders WHERE rowid = (?)',[id],(err,row)=>{
            if(err) {
                return console.log(err)
            }

            if(row) {
                return res.send({id: row.rowid, items: JSON.parse(row.items)})
            }

            return res.sendStatus(204)

        })
        closeDataBase(db)
    },
    destroy: (req,res)=>{
        let db = openDataBase(databaseName,sqlite.OPEN_READWRITE)
        let {id} = req.params

        db.run('DELETE FROM orders WHERE rowid = (?)',[id],err=>{
            if(err) {
                return console.log(err)
            }

            return res.sendStatus(200)
        })


        closeDataBase(db)
    },
    update: (req,res)=>{
        let db = openDataBase(databaseName,sqlite.OPEN_READWRITE)

        let {id} = req.params
        let newOrder = req.body

        db.run('UPDATE orders SET items = (?) WHERE rowid = (?)',[JSON.stringify(newOrder.items),id],(err)=>{
            if(err){
                return console.log(err)
            }

            return res.sendStatus(200)
        })
        closeDataBase(db)
    },
}

module.exports = controller