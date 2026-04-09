const { promisePool } = require('../config/db');

// POST 
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
    console.error(error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ success: false, message: 'Alguna referencia no existe' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

//  GET (todos) 
const getInspecciones = async (req, res) => {
  try {
    const [rows] = await promisePool.execute(`
      SELECT i.*, 
             a.codigo_interno as ascensor_codigo,
             u.nombre_completo as inspector_nombre,
             s.tipo_servicio
      FROM inspeccion i
      JOIN ascensor a ON i.id_ascensor = a.id_ascensor
      JOIN usuario u ON i.id_inspector = u.id_usuario
      JOIN solicitud s ON i.id_solicitud = s.id_solicitud
      ORDER BY i.fecha_inicio DESC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET (por ID) 
const getInspeccionById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await promisePool.execute(`
      SELECT i.*, 
             a.codigo_interno as ascensor_codigo,
             u.nombre_completo as inspector_nombre,
             s.tipo_servicio
      FROM inspeccion i
      JOIN ascensor a ON i.id_ascensor = a.id_ascensor
      JOIN usuario u ON i.id_inspector = u.id_usuario
      JOIN solicitud s ON i.id_solicitud = s.id_solicitud
      WHERE i.id_inspeccion = ?
    `, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Inspección no encontrada' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { crearInspeccion, getInspecciones, getInspeccionById };
