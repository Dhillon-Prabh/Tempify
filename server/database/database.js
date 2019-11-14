const mysql = require('mysql');

var pool  = mysql.createPool({
  "host"      : "remotemysql.com",
  "user"      : "EKTr45LdT9",
  "password"  : "rG5VwhZk8Z",
  "database"  : "EKTr45LdT9",
  "port"      : 3306
});
 
var getConnection = (cb) => {
  pool.getConnection((err, connection) => {
      if(err) {
        return cb(err);
      }
      cb(null, connection);
  });
};

module.exports = getConnection;

