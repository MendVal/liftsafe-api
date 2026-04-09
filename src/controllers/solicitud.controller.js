const { promisePool } = require('../config/db');

// POST 
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
    console.error(error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ success: false, message: 'Cliente o ascensor no existe' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET (todos) 
const getSolicitudes = async (req, res) => {
  try {
    const [rows] = await promisePool.execute(`
      SELECT s.*, 
             u.nombre_completo as cliente_nombre,
             a.codigo_interno as ascensor_codigo
      FROM solicitud s
      JOIN usuario u ON s.id_cliente = u.id_usuario
      JOIN ascensor a ON s.id_ascensor = a.id_ascensor
      ORDER BY s.fecha_solicitud DESC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET (por ID) 
const getSolicitudById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await promisePool.execute(`
      SELECT s.*, 
             u.nombre_completo as cliente_nombre,
             a.codigo_interno as ascensor_codigo
      FROM solicitud s
      JOIN usuario u ON s.id_cliente = u.id_usuario
      JOIN ascensor a ON s.id_ascensor = a.id_ascensor
      WHERE s.id_solicitud = ?
    `, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { crearSolicitud, getSolicitudes, getSolicitudById };