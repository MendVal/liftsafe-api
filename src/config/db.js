const mysql = require('mysql2');
require('dotenv').config();

const isRailway = !!process.env.MYSQLHOST;

const host = process.env.MYSQLHOST || 'localhost';
const port = process.env.MYSQLPORT || 3306;
const user = process.env.MYSQLUSER || 'root';
const password = process.env.MYSQLPASSWORD || '';


const database = isRailway ? 'railway' : (process.env.MYSQLDATABASE || 'liftsafe_db');

console.log(`Conectando a BD (${isRailway ? 'Railway' : 'local'}):`, { host, port, user, database });

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