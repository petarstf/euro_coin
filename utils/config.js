const dotenv = require('dotenv').config();

const serverPort = process.env.SERVER_PORT;
const serverHost = process.env.SERVER_HOST;

const mysqlUser = process.env.MYSQL_USER;
const mysqlPassword = process.env.MYSQL_PASSWORD;
const mysqlDatabase = process.env.MYSQL_DATABASE;
const mysqlPort = process.env.MYSQL_PORT;

module.exports = {
  server: {
    port: serverPort,
    host: serverHost
  },
  mysql: {
    user: mysqlUser,
    password: mysqlPassword,
    database: mysqlDatabase,
    port: mysqlPort
  }
}