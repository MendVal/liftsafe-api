const { promisePool } = require('../config/db');

const crearSolicitud = async (req, res) => {
  try {
    const {
      id_cliente, id_ascensor, tipo_servicio, prioridad,
      fecha_solicitud, fecha_deseada, observaciones
    } = req.body;

    if (!id_cliente || !id_ascensor || !tipo_servicio || !prioridad || !fecha_solicitud) {
      return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }

    const [result] = await promisePool.execute(
      `INSERT INTO solicitud (
        id_cliente, id_ascensor, tipo_servicio, prioridad,
        fecha_solicitud, fecha_deseada, estado, observaciones
      ) VALUES (?, ?, ?, ?, ?, ?, 'Pendiente', ?)`,
      [id_cliente, id_ascensor, tipo_servicio, prioridad, fecha_solicitud, fecha_deseada, observaciones]
    );

    res.status(201).json({ success: true, message: 'Solicitud creada', id_solicitud: result.insertId });
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ success: false, message: 'Cliente o ascensor no existe' });
    }
    res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
  }
};

module.exports = { crearSolicitud };