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
    show: {},
    delete: {},
    update: {},
}

module.exports = controller