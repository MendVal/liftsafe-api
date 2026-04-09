const { promisePool } = require('../config/db');

// POST 
const crearAscensor = async (req, res) => {
  try {
    const {
      id_cliente, codigo_interno, marca, modelo, numero_serie,
      tipo_ascensor, capacidad_kg, capacidad_personas, numero_pisos,
      velocidad_ms, ubicacion_exacta, direccion_completa, ciudad,
      fecha_instalacion
    } = req.body;

    if (!codigo_interno || !marca || !modelo || !numero_serie) {
      return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }

    const [result] = await promisePool.execute(
      `INSERT INTO ascensor (
        id_cliente, codigo_interno, marca, modelo, numero_serie,
        tipo_ascensor, capacidad_kg, capacidad_personas, numero_pisos,
        velocidad_ms, ubicacion_exacta, direccion_completa, ciudad,
        estado, fecha_instalacion
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Activo', ?)`,
      [
        id_cliente, codigo_interno, marca, modelo, numero_serie,
        tipo_ascensor, capacidad_kg, capacidad_personas, numero_pisos,
        velocidad_ms, ubicacion_exacta, direccion_completa, ciudad,
        fecha_instalacion
      ]
    );

    res.status(201).json({ success: true, message: 'Ascensor creado', id_ascensor: result.insertId });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'El código interno ya existe' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ success: false, message: 'Cliente no existe' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

//  GET (todos) 
const getAscensores = async (req, res) => {
  try {
    const [rows] = await promisePool.execute(`
      SELECT a.*, u.nombre_completo as nombre_cliente
      FROM ascensor a
      JOIN usuario u ON a.id_cliente = u.id_usuario
      ORDER BY a.id_ascensor DESC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET (por ID) 
const getAscensorById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await promisePool.execute(`
      SELECT a.*, u.nombre_completo as nombre_cliente
      FROM ascensor a
      JOIN usuario u ON a.id_cliente = u.id_usuario
      WHERE a.id_ascensor = ?
    `, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Ascensor no encontrado' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { crearAscensor, getAscensores, getAscensorById };