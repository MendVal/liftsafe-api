const { promisePool } = require('../config/db');

const crearInspeccion = async (req, res) => {
  try {
    const {
      id_programacion, id_ascensor, id_inspector, id_solicitud, fecha_inicio
    } = req.body;

    if (!id_programacion || !id_ascensor || !id_inspector || !id_solicitud || !fecha_inicio) {
      return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }

    const [result] = await promisePool.execute(
      `INSERT INTO inspeccion (
        id_programacion, id_ascensor, id_inspector, id_solicitud,
        fecha_inicio, estado
      ) VALUES (?, ?, ?, ?, ?, 'Pendiente')`,
      [id_programacion, id_ascensor, id_inspector, id_solicitud, fecha_inicio]
    );

    res.status(201).json({ success: true, message: 'Inspección creada', id_inspeccion: result.insertId });
  } catch (error) {
    console.error('Error al crear inspección:', error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ success: false, message: 'Alguna referencia (programación, ascensor, inspector, solicitud) no existe' });
    }
    res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
  }
};

module.exports = { crearInspeccion };
