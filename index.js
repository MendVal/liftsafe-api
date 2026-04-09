const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas montadas
const apiRoutes = require('./src/index');

app.use('/api', apiRoutes);

// Ruta de prueba de base de datos
const { promisePool } = require('./src/config/db');
app.get('/test-db', async (req, res) => {
  try {
    await promisePool.execute('SELECT 1');
    res.json({ success: true, message: '✅ Conectado a BD' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'API LiftSafe funcionando' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor LiftSafe en http://localhost:${PORT}`);
  console.log(`POST /api/ascensores`);
  console.log(`POST /api/solicitudes`);
  console.log(`POST /api/inspecciones`);
  console.log(`GET /test-db para probar conexión`);
});