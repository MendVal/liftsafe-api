const express = require('express');
const { crearSolicitud, getSolicitudes, getSolicitudById } = require('../controllers/solicitud.controller');
const routerSolicitud = express.Router();

routerSolicitud.post('/', crearSolicitud);
routerSolicitud.get('/', getSolicitudes);
routerSolicitud.get('/:id', getSolicitudById);

module.exports = routerSolicitud;