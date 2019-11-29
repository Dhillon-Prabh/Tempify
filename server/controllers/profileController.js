const db = require('../database/database');

exports.tempProfile = (req, res, next) => {
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
        res.status(401).send({ error : "error message",});
        con.release();
      } else {
        res.status(200).json(result);
        con.release();
      }
    });
  })
}

exports.tempUpdateProfile = (req, res, next) => {
  
  const user = req.body;
  const userId = req.decodedToken.userId;
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    return new Promise(function (resolve, reject) {
      var userQuery = 'UPDATE temps SET updated_at = ?, type_of_practice = ?, imagename = ?, ' +
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
        receptionist, user.experience, dentalsw, user.city, user.phone, Number(userId)];
      con.query(userQuery, values, (err, result, fields) => {
        console.log(result);
        if(!err) {
          console.log("no error proceeding to resolve");
          resolve(result);
        } else {
          reject(err);
        }
      });
    })
    .then(function(result) {
      var tempQuery = 'UPDATE users SET name = ?, updated_at = ? WHERE id = ?;';
      valuesTemp=[user.name, new Date(), user.userId];
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
}

exports.dentalProfile = (req, res, next) => {

  const user = req.decodedToken
  console.log("Inside dentalProfile");
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    
    var userQuery = 'SELECT dentist_name, office_name, phone_number, street_number, street_name, unit_number, ' +
      'city, province, postalcode, parking_options FROM dentists WHERE user_id = ? LIMIT 1';
    values=[user.userId];
    con.query(userQuery, values, (err, result, fields) => {
      console.log(result);
      if(!result.length) {
        return res.status(401).send({ error : "error message",});
      } else {
        return res.status(200).json(result);
      }
    });
  })
}


exports.dentalUpdateProfile = (req, res, next) => {
  
  const user = req.body;
  const userId = req.decodedToken.userId;
  console.log(user); 
  console.log(userId);
  console.log("Inside dentalUpdateProfile");
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    return new Promise(function (resolve, reject) {
      var userQuery = 'UPDATE dentists SET updated_at = ?, phone_number = ?, office_name = ?, ' +
        'dentist_name = ?, street_number = ?, street_name = ?, unit_number = ?, city = ?, ' +
        'province = ?, postalcode = ?, parking_options = ? WHERE user_id = ?;';
      values=[new Date(), user.phone, user.officeName, user.name, user.streetNo, user.streetName,
        user.unit, user.city, user.province, user.postalCode, user.parking, Number(userId)];
      con.query(userQuery, values, (err, result, fields) => {
        console.log(result);
        if(!err) {
          console.log("no error proceeding to resolve");
          resolve(result);
        } else {
          reject(err);
        }
      });
    })
    .then(function(result) {
      var dentalQuery = 'UPDATE users SET name = ?, updated_at = ? WHERE id = ?;';
      valuesTemp=[user.name, new Date(), Number(userId)];
        con.query(dentalQuery, valuesTemp, (err, result, fields) => {
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
}