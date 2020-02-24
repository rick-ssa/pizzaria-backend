const {databaseName,openDataBase,createOrdersTable,createPizzaTable,closeDataBase} = require('./databaseSctruture')
const sqlite = require('sqlite3').verbose()

const functions = {
    createDatabase: () =>{
        let db = openDataBase(databaseName, sqlite.OPEN_CREATE | sqlite.OPEN_READWRITE)
        createPizzaTable(db)
        createOrdersTable(db)
        closeDataBase(db)
    },
}

module.exports = functions