const { promisePool } = require('../config/db');

const crearAscensor = async (req, res) => {
  try {
    const {
      id_cliente, codigo_interno, marca, modelo, numero_serie,
      tipo_ascensor, capacidad_kg, capacidad_personas, numero_pisos,
      velocidad_ms, ubicacion_exacta, direccion_completa, ciudad,
      fecha_instalacion
    } = req.body;

    // Validación rápida de campos obligatorios
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
    console.error('Error al crear ascensor:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'El código interno ya existe' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ success: false, message: 'El cliente referenciado no existe' });
    }
    res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
  }
};

module.exports = { crearAscensor };