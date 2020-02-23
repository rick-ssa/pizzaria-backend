const sqlite = require('sqlite3').verbose()

const dbFunctions = {
    databaseName: './database/database.db',
    openDataBase: (dbName,mode) => {
        return new sqlite.Database(dbName,mode,(err)=>{})
    },

    closeDataBase: (db) =>{
        db.close()
    },

    createPizzaTable: (db) => {
        db.run('CREATE TABLE IF NOT EXISTS pizzas (' +
               'name TEXT NOT NULL,' +
               'price REAL NOT NULL,' +
               'ingredients TEXT' +
        ');')
    },
}

module.exports = dbFunctions
 