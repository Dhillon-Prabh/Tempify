const mysql = require('mysql');

let dbconfig = require(__dirname + '/../config/db-config-multi.json');

var pool  = mysql.createPool(dbconfig);

 
var getConnection = (cb) => {
  pool.getConnection((err, connection) => {
      if(err) {
        return cb(err);
      }
      cb(null, connection);
  });
};

module.exports = getConnection;

