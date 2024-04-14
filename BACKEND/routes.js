const express = require('express');
const router = express.Router();
const personController = require('./controllers/personController');
// Rutas 
router.get('/persons', personController.getPersons);
module.exports = router;