
require('dotenv').config()

module.exports = {
  "username": process.env.DB_USER,
  "password": process.env.DB_PWD,
  "database": process.env.DB_NAME,
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "dialect": 'postgres'
}