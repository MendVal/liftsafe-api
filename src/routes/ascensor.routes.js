const express = require('express');
const { crearAscensor, getAscensores, getAscensorById } = require('../controllers/ascensor.controller');
const routerAscensor = express.Router();

routerAscensor.post('/', crearAscensor);
routerAscensor.get('/', getAscensores);
routerAscensor.get('/:id', getAscensorById);

module.exports = routerAscensor;