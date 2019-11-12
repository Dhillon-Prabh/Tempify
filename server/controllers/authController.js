const db = require('../database/database');

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password; 

  db((err, con) => {

    if(err){
      console.log(err);
      throw err;
    }
  
    var userQuery = "SELECT * FROM users";

    con.query(userQuery, (err, result, fields) => {
      res.send(result);

      if(result[0].email == email && result[0].password == password){
        res.status(200);
      }

      con.release();
    })
  }
)}


exports.tempRegister = (req, res, next) => {
  const user = req.body;
  console.log("Inside tempRegister");
  db((err, con) => {

    if(err){
      console.log(err);
      throw err;
    }

    function addUser() {
      return new Promise(function (resolve, reject) {
        var userQuery = 'INSERT INTO users(name, email, password, remember_token, created_at, updated_at,' +
        'server_response, role, current_login_time,' +
        'last_login_time, status, unsubscribe_from_emails, unsubscribe_modules) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);' +
        'SELECT LAST_INSERT_ID();';
        values=[user.name, user.email, user.password, null, new Date(), new Date(), null, 2, null, null, 1, 0, null];
        con.query(userQuery, values, (err, result, fields) => {
          if(!err) {
            console.log("no error proceeding to resolve");
            resolve(result);
          } else {
            reject(err);
          }
        })
      })
    }
    addUser().then(function(result) {
      console.log("this witll and shall og");
    });
    addUser().catch(function(err) {
      console.log("Error:" + err);
      con.release();
    })
  }
)}