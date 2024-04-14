const {poolPromise} = require('../database');

async function getPersons(req, res) {    
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM persons');
        res.json(result.recordset);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
}
module.exports = {
    getPersons
};
