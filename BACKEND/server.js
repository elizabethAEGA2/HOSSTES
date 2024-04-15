const express = require('express');
const { Connection, Request } = require('tedious');

const app = express();

// Configuración de la conexión a la base de datos
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

// Función para ejecutar la consulta SQL
function executeStatement(callback) {
    const connection = new Connection(config);

    connection.on('connect', (err) => {
        if (err) {
            callback(err);
        } else {
            const request = new Request('SELECT * FROM persons', (err, rowCount, rows) => {
                if (err) {
                    callback(err);
                } else {
                    const result = [];
                    rows.forEach(row => {
                        const rowData = {};
                        row.forEach((column, index) => {
                            rowData[columns[index].metadata.colName] = column.value;
                        });
                        result.push(rowData);
                    });
                    callback(null, result);
                }
            });

            connection.execSql(request);
        }
    });
}

// Ruta para obtener los datos
app.get('/', (req, res) => {
    executeStatement((err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
});

// Levantar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Servidor Express escuchando en el puerto ${PORT}');
});