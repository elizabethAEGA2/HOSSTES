/*const sql = require ('mssql');
const config = {
    
    user: 'sa',
    password: 'ELIZA',
    server: 'DELL',    
    database: 'HOSTESS',
    options: {
        trustedConnection: true, 
        encrypt: false,
        trustServerCertificate: true,

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
 */
const { Connection, Request } = require('tedious');

const config = {
    server: 'DELL',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: 'ELIZA'
        }
    },
    options: {
        port: 1433,
        database: 'HOSTESS',
        trustServerCertificate: true
    }
};

const connection = new Connection(config);

connection.on('connect', (err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
    } else {
        console.log("Conexión exitosa a la base de datos");
        // Aquí puedes llamar a cualquier función que desees ejecutar después de conectar
        executeStatement();
    }
});

function executeStatement() {
    const request = new Request('SELECT * FROM persons', (err, rowCount, rows) => {
        if (err) {
            console.error("Error al ejecutar la consulta:", err);
        } else {
            console.log(`${rowCount} filas devueltas`);
            // Aquí puedes procesar los resultados
            rows.forEach(row => {
                console.log(row);
            });
        }
    });

    connection.execSql(request);
}
