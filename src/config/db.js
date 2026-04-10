const mysql = require('mysql2');

// Cargar variables de entorno
require('dotenv').config();

const host = process.env.MYSQLHOST || process.env.DB_HOST || 'localhost';
const port = process.env.MYSQLPORT || process.env.DB_PORT || 3306;
const user = process.env.MYSQLUSER || process.env.DB_USER || 'root';
const password = process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '';
const database = process.env.MYSQLDATABASE || process.env.DB_NAME || 'liftsafe_db';

console.log(' Conectando a BD con:', { host, port, user, database }); 

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