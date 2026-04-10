const mysql = require('mysql2');
require('dotenv').config();


const isRailway = !!process.env.MYSQLHOST;

const host = process.env.MYSQLHOST || process.env.DB_HOST || 'localhost';
const port = process.env.MYSQLPORT || process.env.DB_PORT || 3306;
const user = process.env.MYSQLUSER || process.env.DB_USER || 'root';
const password = process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '';

// Si está en Railway, forzar 'railway' como nombre de la BD
const database = isRailway 
  ? 'railway' 
  : (process.env.MYSQLDATABASE || process.env.DB_NAME || 'liftsafe_db');

console.log('🔌 Conectando a BD con:', { host, port, user, database, isRailway });

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