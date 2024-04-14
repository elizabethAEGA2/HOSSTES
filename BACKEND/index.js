const express = require('express');
const app = express();
const PORT = 3000;
const routes = require('./routes');

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo ${PORT}`);
});