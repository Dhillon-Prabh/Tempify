const db = require('../database/database');


exports.tempProfile = (req, res, next) => {

  const token = req.decodedToken;
  console.log(req.decodedToken);
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
  
    var userQuery = 'SELECT temp_name, experience, expected_rate, city, designation, type_of_practice, ' +
      'dental_software, imagename, phone FROM temps WHERE user_id = ? LIMIT 1';
    values=[token.userId];
    con.query(userQuery, values, (err, result, fields) => {
      if(!result.length) {
        return res.status(401).send({ error : "error message",});
      } else {
        return res.status(200).json(result);
      }
    });
    con.release();
  })
}

exports.tempUpdateProfile = (req, res, next) => {
  
  const user = req.body;
  const token = req.decodedToken;
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    return new Promise(function (resolve, reject) {
      var tempQuery = 'UPDATE temps SET updated_at = ?, type_of_practice = ?, imagename = ?, ' +
        'expected_rate = ?, temp_name = ?, designation = ?, is_assistant = ?, is_hygienist = ?, ' +
        'is_receptionist = ?, experience = ?, dental_software = ?, city = ?, phone = ? ' +
        'WHERE user_id = ?;';
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
      values=[new Date(), user.practice, user.imageName, user.expectedRate, user.name, role, assistant, hygienist,
        receptionist, user.experience, dentalsw, user.city, user.phone, token.userId];
      con.query(tempQuery, values, (err, result, fields) => {
        console.log("token - userId: " + token.userId);
        if(!err) {
          console.log("no error proceeding to resolve");
          resolve(result);
        } else {
          reject(err);
        }
      });
    })
    .then(function(result) {
      var userQuery = 'UPDATE users SET name = ?, updated_at = ? WHERE id = ?;';
      valuesUser=[user.name, new Date(), token.userId];
        con.query(userQuery, valuesUser, (err, result, fields) => {
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
}

exports.dentalProfile = (req, res, next) => {

  const user = req.body;
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }

    var dentalQuery = 'SELECT id, user_id, dentist_name, email, office_name, phone_number, street_number, ' +
      'street_name, unit_number, city, province, postalcode, parking_options FROM dentists ' +
      'WHERE group_id = ?;';
    values=[Number(user.groupId)];
    con.query(dentalQuery, values, (err, result, fields) => {
      if(!result.length) {
        return res.status(401).send({ error : "error message",});
      } else {
        return res.status(200).json(result);
      }
    });
    con.release();
  })
}

exports.dentalUpdateProfile = (req, res, next) => {
  
  const user = req.body;
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    return new Promise(function (resolve, reject) {
      var dentalQuery = 'UPDATE dentists SET updated_at = ?, phone_number = ?, office_name = ?, ' +
        'dentist_name = ?, street_number = ?, street_name = ?, unit_number = ?, city = ?, ' +
        'province = ?, postalcode = ?, parking_options = ? WHERE user_id = ?;';
      values=[new Date(), user.phone, user.officeName, user.name, user.streetNo, user.streetName,
        user.unit, user.city, user.province, user.postalCode, user.parking, Number(user.userId)];
      con.query(dentalQuery, values, (err, result, fields) => {
        if(!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    })
    .then(function(result) {
      var userQuery = 'UPDATE users SET name = ?, updated_at = ? WHERE id = ?;';
      valuesTemp=[user.name, new Date(), Number(user.userId)];
        con.query(userQuery, valuesTemp, (err, result, fields) => {
          if(!err) {
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
}

exports.dentalInsertProfile = (req, res, next) => {

  const user = req.body;
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
      var dentalQuery = 'INSERT INTO dentists(created_at, updated_at, user_id, phone_number, email, office_name, ' +
        'dentist_name, street_number, street_name, unit_number, city, province, postalcode, parking_options, ' + 
        'group_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
      values=[new Date(), new Date(), result.insertId, user.phone, user.email, user.officeName, user.name,
        user.streetNo, user.streetName, user.unit, user.city, user.province, user.postalCode, user.parking,
        Number(user.groupId)];
      con.query(dentalQuery, values, (err, result, fields) => {
        console.log(values);
        // if(!err) {
        //   console.log("no error proceeding to success");
        //   res.status(300).send({
        //     message: "success"
        //   });
        //   con.release();
        // } else {
        //   console.log("Error:" + err);
        //   res.status(400).send({
        //     error: "unable to complete request"
        //   });
        //   con.release();
        // }
        if (err) {
          console.log("Error:" + err);
          res.status(400).send({
            error: "unable to complete request"
          });
        }
        con.release();
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
