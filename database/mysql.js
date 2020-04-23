const server = require('../utils/config').server;
const mysql = require('mysql2');
const mysqlConf = require('../utils/config').mysql;

const mysqlConnection =  mysql.createConnection({
    host: server.serverHost,
    user: mysqlConf.user,
    database: mysqlConf.database
});

mysqlConnection.connect(function(err){
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('Successully connected to MySQL Database.');
});


module.exports = mysqlConnection;