
const mysql = require('mysql')

const {database} =  require('./keys')

console.log('database', database)

const {promisify} = require('util') 


// It creates an thread pool and each thread do a specific task
const  pool = mysql.createPool( database)

pool.getConnection((err, connection) => {

    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST' ){
            console.log ('DATABASE CONNECTION WAS CLOSED')
        }
        if (err.code === 'ER_CON_COUNT_ERROR' ){
            console.log ('DATABASE HAS TOO MANY OPENED CONECTIONS')
        }
        if (err.code === 'ECCONNREFUSED' ){
            console.log ('DATABASE CONNECTION WAS REFUSED')
        }
    }

    if(connection) connection.release();
    
    console.log('DB is connected')

    return
})

// This module doesn't support promises
// unless we use promisify
// convert only queries from callback to promises
pool.query = promisify(pool.query)

module.exports = pool; 