const db = require('../database/database');
const jwt = require('jsonwebtoken');

exports.tempProfile = (req, res, next) => {

  const user = req.body;
  console.log("Inside tempProfile");
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    return new Promise(function (resolve, reject) {
      var validate = 'SELECT id FROM users WHERE email = ?';
      con.query(validate, [user.email], (err, result, fields) => {
        if (result.length > 0) {
          reject(401);
        } else {
          var userQuery = 'SELECT temp_name, type_of_practice, expected_rate, experience, designation,' +
            'dental_software, city, imagename, phone FROM temps WHERE user_id = ? LIMIT 1;';
          values=[result.userId];
          console.log("result.userId: " + result.userId);
          con.query(userQuery, values, (err, result, fields) => {
            console.log("query result: " + result);
            if(!err) {
              console.log("no error proceeding to resolve");
              resolve(result);
            } else {
              reject(err);
            }
          });
        }
      })
    })
    
    // var userQuery = 'SELECT temp_name, type_of_practice, expected_rate, experience, designation,' +
    //   'dental_software, city, imagename, phone FROM temps WHERE user_id = ? LIMIT 1';
    // values=[user.userId];
    // con.query(userQuery, values, (err, result, fields) => {
    //   console.log("query result: " + result);
    //   if(!result.length) {
    //     return res.status(401).send({ error : "error message",});
    //   } else {
    //     return res.status(200).json(result);
    //   }
    // });
  })
}


exports.tempUpdateProfile = (req, res, next) => {
  
  const user = req.body;
  console.log("Inside tempProfile");
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    return new Promise(function (resolve, reject) {
      var validate = 'SELECT id FROM users WHERE email = ?';
      con.query(validate, [user.email], (err, result, fields) => {
        if (result.length > 0) {
          reject(401);
        } else {
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
        }
      })
    })
    .then(function(result) {
      var tempQuery = 'INSERT INTO temps(type_of_practice, imagename, email, expected_rate, license_number,' +
      'temp_name, designation, is_assistant, is_hygienist, is_receptionist, experience, is_approved,' +
      'dental_software, city, user_id, updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
      var role = '[\"' + user.role[0] + '\"';
      var dentalsw = '[\"' + user.dentalsw[0] + '\"';
      var assistant = 0;
      var hygienist = 0;
      var receptionist = 0;
      for (let i in user.role) {
        if (user.role[i] == 'Assistant') assistant = 1;
        if (user.role[i] == 'Registered Dental Hygienist') hygienist = 1;
        if (user.role[i] == 'Receptionist') receptionist = 1;
        if (i > 0) role += ',\"' + user.role[i] + '\"';
      }
      for (let i in user.dentalsw) {
        if (i > 0) dentalsw += ',\"' + user.dentalsw[i] + '\"';
      }
      role += ']';
      dentalsw += ']';
      valuesTemp=[user.practice, null, user.email, user.expectedRate, user.license, user.name, role, assistant, hygienist, receptionist, user.experience, 0, dentalsw,
          user.city, result.insertId, new Date(), new Date()];
        con.query(tempQuery, valuesTemp, (err, result, fields) => {
          //console.log(this.valuesTemp);
          if(!err) {
            console.log("no error proceeding to success");
            res.status(300).send({ message: "success" });
            con.release();
          } else {
            console.log("Error:" + err);
            res.status(400).send({error: "unable to complete request"});
            con.release();
          }
        })
    })
    .catch(function(err) {
      console.log("Error:" + err);
      res.status(err).send({error: "There was an error"})
      con.release();
    });
  })
  next();
}