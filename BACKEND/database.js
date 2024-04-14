const sql = require ('mssql');
const config = {
    
    server: '',    
    database: 'HOSTESS',
    options: {
        trustedConnection: true, 
        encrypt: false

    }
};
const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool => {
    console.log('BASE DE DATOS CONECTADA')
    return pool
})
.catch(err => console.log('BASE DE DATOS NO CONECTADA', err));

module.exports = {
    sql, poolPromise
};
