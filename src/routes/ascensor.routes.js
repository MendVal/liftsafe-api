const express = require('express');
const { crearAscensor } = require('../controllers/ascensor.controller');
const routerAscensor = express.Router();

routerAscensor.post('/', crearAscensor);

module.exports = routerAscensor;