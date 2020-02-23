const {databaseName,openDataBase,createIngredientsTable,createPizzaTable,closeDataBase,createPizzasIngredientsTable} = require('./databaseSctruture')
const sqlite = require('sqlite3').verbose()

const functions = {
    createDatabase: () =>{
        let db = openDataBase(databaseName, sqlite.OPEN_CREATE | sqlite.OPEN_READWRITE)
        createPizzaTable(db)
        closeDataBase(db)
    },
}

module.exports = functions