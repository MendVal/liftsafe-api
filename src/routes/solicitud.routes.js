const express = require('express');
const { crearSolicitud } = require('../controllers/solicitud.controller');
const routerSolicitud = express.Router();

routerSolicitud.post('/', crearSolicitud);

module.exports = routerSolicitud;