const db = require('../database/database');
const {check, validationResult} = require('express-validator/check');

exports.postGig = [
  check('date').isAfter('2019-11-24').withMessage("Date should be in the future"),
  check('time').custom(value =>{
      var times = value.split("-");
      var fromTime = parseInt(times[0]);
      var toTime = parseInt(times[1]);
      if(fromTime >= toTime) {
          throw new Error('Ending time cannot be less than starting time');
      }
      return true;
  }), 
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      var job = req.body;
      db((err, con) => {
        if(err){
          console.log(err);
          throw err;
        }
        return new Promise(function (resolve, reject) {
            var query = 'SELECT id FROM dentists WHERE user_id = ?;';
            values=[job.userId];
            con.query(query, values, (err, result, fields) => {
            if(!err) {
              var query = 'INSERT INTO gigs(created_at, updated_at, dentist_id, date, time, designation,' +
              'status) VALUES (?, ?, ?, ?, ?, ?, ?);';
              values=[new Date(), new Date(), result[0].id, job.date, job.time, job.designation, 'POSTED'];
                con.query(query, values, (err, result, fields) => {
                  if(!err) {
                    console.log("no error proceeding to success");
                    resolve(result)
                  } else {
                    reject(err);
                  }
                })
            } else {
                reject(err);
            }
            });
        })
        .then(function(result) {
          var query = 'UPDATE gigs SET reference_number = ? WHERE id = ?;';
          values=['GIG' + result.insertId, result.insertId];
            con.query(query, values, (err, result, fields) => {
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
  }
]
