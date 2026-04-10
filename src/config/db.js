const mysql = require('mysql2');
require('dotenv').config();


const isRailway = !!process.env.MYSQLHOST;

// Configuración de la base de datos
const host = process.env.MYSQLHOST || 'localhost';
const port = process.env.MYSQLPORT || 3306;
const user = process.env.MYSQLUSER || 'root';
const password = process.env.MYSQLPASSWORD || '';
// Si es Railway, usa 'railway'; si no, usa el valor de variable o 'liftsafe_db'
const database = isRailway ? 'railway' : (process.env.MYSQLDATABASE || 'liftsafe_db');

console.log(`🔌 Conectando a BD en ${isRailway ? 'Railway' : 'local'}:`, { host, port, user, database });

const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

module.exports = { promisePool };