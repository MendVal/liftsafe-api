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
app.get('/test-db', async (req, res) => {
  const { promisePool } = require('./src/config/db');
  try {
    const [result] = await promisePool.execute('SELECT 1 as connected');
    res.json({ success: true, message: 'Conectado a BD' });
  } catch (error) {
    console.error(' Error en /test-db:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage
    });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'API LiftSafe funcionando' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor LiftSafe en http://localhost:${PORT}`);
  console.log(` POST /api/ascensores`);
  console.log(` POST /api/solicitudes`);
  console.log(` POST /api/inspecciones`);
  console.log(` GET /test-db para probar conexión`);
});