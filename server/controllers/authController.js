const db = require('../database/database');
const jwt = require('jsonwebtoken');

exports.postLogin = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password; 

  db((err, con) => {

    if(err){
      throw err;
    }    

    const query = "SELECT email, password, id FROM `users` WHERE `email` = ? AND `password` = ?";
    con.query(query, [email, password], (err, result, fields) => {     
      if(!result.length) {
        return  res.status(401).send({ error : "error message" });
      }

      let loadedUser = result[0];
        const token = jwt.sign(
          {
            email: loadedUser.email, 
            userId: loadedUser.id
          }, 'secret', { 
            expiresIn: '1h' 
          }
        );
  
        res
          .status(200)
          .json({
            token: token,
            userId: loadedUser.id
            }
          )

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