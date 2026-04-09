const express = require('express');
const { crearInspeccion } = require('../controllers/inspeccion.controller');
const routerInspeccion = express.Router();

routerInspeccion.post('/', crearInspeccion);

module.exports = routerInspeccion;