
require('dotenv').config();

module.exports = {
  DB_HOST: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  DB_USER: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  DB_DATABASE: process.env.MYSQLDATABASE || process.env.DB_NAME || 'liftsafe_db'
};