const mysql = require('mysql2');
require('dotenv').config();


const host = process.env.MYSQLHOST || 'localhost';
const port = process.env.MYSQLPORT || 3306;
const user = process.env.MYSQLUSER || 'root';
const password = process.env.MYSQLPASSWORD || '';
// El nombre de la base de datos en Railway es 'railway'
const database = process.env.MYSQLDATABASE || 'railway';

console.log(' Conectando a BD:', { host, port, user, database });

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