const express = require('express');
const { crearInspeccion, getInspecciones, getInspeccionById } = require('../controllers/inspeccion.controller');
const routerInspeccion = express.Router();

routerInspeccion.post('/', crearInspeccion);
routerInspeccion.get('/', getInspecciones);
routerInspeccion.get('/:id', getInspeccionById);

module.exports = routerInspeccion;