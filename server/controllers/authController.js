const db = require('../database/database');
const jwt = require('jsonwebtoken');

exports.postLogin = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;
  db((err, con) => {

    if (err) {
      throw err;
    }

    const query = "SELECT email, password, id, role FROM `users` WHERE `email` = ? AND `password` = ?";
    con.query(query, [email, password], (err, result, fields) => {
      if(!result.length) {
        return res.status(401).send({
          error: "error message",
        });
      } else if(result[0].role == 1) {
        var userQuery = 'SELECT id, group_id FROM dentists WHERE user_id = ? LIMIT 1;';
        values=[result[0].id];
        con.query(userQuery, values, (err, row, fields) => {
          if(!err) {
            console.log("no error proceeding to resolve");
            let loadedUser = result[0];
            let office = row[0];
            const token = jwt.sign(
              {
                email: loadedUser.email, 
                userId: loadedUser.id,
                officeId: office.id,
                groupId: office.group_id,
                userType:'office'
              }, 'secret', { 
                expiresIn: '1h' 
              }
            );
      
            res
              .status(200)
              .json({
                token: token,
                userId: loadedUser.id,
                role: loadedUser.role,
                officeId: office.id,
                groupId: office.group_id,
                userType: 'office'
                }
              )
            con.release();
          } else {
            console.log("error fetching office id");
            con.release();
          }
        });
      } else {
        let loadedUser = result[0];
          const token = jwt.sign(
            {
              email: loadedUser.email, 
              userId: loadedUser.id,
              officeId: -1,
              groupId: -1,
              userType:'temp'
            }, 'secret', { 
              expiresIn: '1h' 
            }
          );
    
          res
            .status(200)
            .json({
              token: token,
              userId: loadedUser.id,
              role: loadedUser.role,
              officeId: -1,
              groupId: -1,
              userType: 'temp'
            })
        con.release();
      }
    })
  })
}

exports.getTempDashboardInformation = (req, res, next) => {
  const user = req.decodedToken;
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
  
    var userQuery = 'SELECT temp_name, experience, expected_rate, city, designation, type_of_practice, ' +
      'dental_software, imagename, phone FROM temps WHERE user_id = ? LIMIT 1';
    values=[user.userId];
    con.query(userQuery, values, (err, result, fields) => {
      if(!result.length) {
        return res.status(401).send({ error : "error message",});
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    });
  })
}

exports.tempRegister = (req, res, next) => {
  const user = req.body;
  db((err, con) => {
    if (err) {
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
          values = [user.name, user.email, user.password, null, new Date(), new Date(), null, 2, null, null, 1, 0, null];
          con.query(userQuery, values, (err, result, fields) => {
            if (!err) {
              console.log("no error proceeding to resolve");
              resolve(result);
            } else {
              reject(err);
            }
          });
        }
      })
    })
    .then(function (result) {
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
      valuesTemp = [user.practice, null, user.email, user.expectedRate, user.license, user.name, role, assistant, hygienist, receptionist, user.experience, 0, dentalsw,
        user.city, result.insertId, new Date(), new Date()
      ];
      con.query(tempQuery, valuesTemp, (err, result, fields) => {
        if (!err) {
          console.log("no error proceeding to success");
          res.status(300).send({
            message: "success"
          });
          con.release();
        } else {
          console.log("Error:" + err);
          res.status(400).send({
            error: "unable to complete request"
          });
          con.release();
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
        if(!err) {
          console.log("no error proceeding to success");
          res.status(300).send({
            message: "success"
          });
          con.release();
        } else {
          console.log("Error:" + err);
          res.status(400).send({
            error: "unable to complete request"
          });
          con.release();
        }
      })
    })
    .catch(function(err) {
      console.log("Error:" + err);
      res.status(err).send({
        error: "There was an error"
      })
      con.release();
    });
  })
  next();
}

exports.dentalRegister = (req, res, next) => {

  const user = req.body;
  console.log("Inside dentalRegister");
  db((err, con) => {
    if (err) {
      console.log(err);
      throw err;
    }
    return new Promise(function (resolve, reject) {
      var validate = 'SELECT id FROM users WHERE email = ?';
      con.query(validate, [user.email], (err, result, fields) => {
        if (result.length > 0) {
          reject(401);
        } else {
          var userQuery = 'INSERT INTO users(name, email, password, remember_token, created_at, updated_at, ' +
            'server_response, role, current_login_time, last_login_time, status, ' +
            'unsubscribe_from_emails, unsubscribe_modules) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
          values=[user.name, user.email, user.password, null, new Date(), new Date(), null, 1, null, null, 1, 0, null];
          con.query(userQuery, values, (err, result, fields) => {
            if(!err) {
              console.log("no error proceeding to resolve");
              resolve(result);
            } else {
              console.log("Error:" + err);
              reject(err);
            }
          });
        }
      })
    })
    .then(function(result) {
      var officeGroupQuery = 'INSERT INTO office_group(created_at, user_id) VALUES (?, ?);';
      values=[new Date(), result.insertId];
      con.query(officeGroupQuery, values, (err, result, fields) => {
        if(!err) {
          console.log("no error proceeding to success");
          return result;
        } else {
          console.log("Error:" + err);
          return err;
        }
      })
    })
    .then(function(result) {
      var dentalQuery = 'INSERT INTO dentists(created_at, updated_at, group_id, phone_number, email, ' +
        'office_name, dentist_name, street_number, street_name, unit_number, city, province, postalcode, ' + 
        'parking_options) VALUES (?, ?, (SELECT max(id) FROM office_group), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
      values=[new Date(), new Date(), user.phone, user.email, user.officeName, user.name, user.streetNo,
        user.streetName, user.unit, user.city, user.province, user.postalCode, user.parking];
      con.query(dentalQuery, values, (err, result, fields) => {
        if(!err) {
          console.log("no error proceeding to success");
          res.status(300).send({
            message: "success"
          });
          con.release();
        } else {
          console.log("Error:" + err);
          res.status(400).send({
            error: "unable to complete request"
          });
          con.release();
        }
      })
    })
    .catch(function(err) {
      console.log("Error:" + err);
      res.status(err).send({
        error: "unable to complete request"
      });
      con.release();
    });
  })
  next();
}
