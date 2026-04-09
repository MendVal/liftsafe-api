const express = require('express');
const router = express.Router();

const routerAscensor = require('./routes/ascensor.routes');
const routerSolicitud = require('./routes/solicitud.routes');
const routerInspeccion = require('./routes/inspeccion.routes');

router.use('/ascensores', routerAscensor);
router.use('/solicitudes', routerSolicitud);
router.use('/inspecciones', routerInspeccion);

module.exports = router;