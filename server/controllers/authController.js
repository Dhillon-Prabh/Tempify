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
        'last_login_time, status, unsubscribe_from_emails, unsubscribe_modules) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        values=[user.name, user.email, user.password, null, new Date(), new Date(), null, 2, null, null, 1, 0, null];
        con.query(userQuery, values, (err, result, fields) => {
          if(!err) {
            console.log("no error proceeding to resolve");
            resolve(result);
          } else {
            reject(err);
          }
        });
      });
    }
    addUser().then(function(result) {
      var tempQuery = 'INSERT INTO temps(`type_of_practice`, `imagename`, `email`, `expected_rate`, `license_number`,' +
      '`temp_name`, `designation`, `is_assistant`, `is_hygienist`, `is_receptionist`, `experience`, `is_approved`,' +
      ' `dental_software`, `city`, `user_id`, `updated_at`, `created_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
      valuesTemp=[user.practice, null, user.email, user.expectedRate, user.license, user.name, user.role, 1, 1, 1, user.experience, 0, user.dentalsw,
          user.city, result.insertId, new Date(), new Date()];
        con.query(tempQuery, valuesTemp, (err, result, fields) => {
          if(!err) {
            console.log("no error proceeding to success");
            res.status(300).send({ message: "success" });
            con.release();
          } else {
            reject(err);
          }
        })
    });
    addUser().catch(function(err) {
      console.log("Error:" + err);
      res.status(401).send({error: "unable to complete request"});
      con.release();
    })
  }
)}