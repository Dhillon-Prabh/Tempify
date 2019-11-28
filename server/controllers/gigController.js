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

exports.jobPosting = (req, res, next) => {
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    var query = "SELECT g.id, g.dentist_id, d.office_name, g.designation, g.date, g.time, d.street_number, d.street_name, d.unit_number, d.city, d.parking_options " +
     "FROM gigs g JOIN dentists d on g.dentist_id = d.id WHERE g.status LIKE 'POSTED';";
    con.query(query, (err, result, fields) => {
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

exports.acceptGig = (req, res, next) => {
  var value = req.body;
  console.log(value.acceptData);
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    var query = 'SELECT id, expected_rate FROM temps WHERE user_id = ?;';
        values=[value.userId];
        con.query(query, values, (err, result, fields) => {
        if(!err) {
            var userquery = "UPDATE gigs SET status = ? where id = ?;" +
            "INSERT INTO bookings (`created_at`, `updated_at`, `temp_id`, `temp_status`," + 
            "`dentist_id`, `dental_status`, `reference_number`, `dates`, `is_from_gig`, `timings`," +
            "`designation`, `temp_wage`)" + 
            " VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
          uservalues=["ACCEPTED", value.gigId, new Date(), new Date(), result[0].id, "ACCEPTED", value.acceptData.dentist_id, "POSTED", 
            "TMPFY"+ value.gigId, value.acceptData.date, value.gigId, value.acceptData.time, value.acceptData.designation, result[0].expected_rate];
          con.query(userquery, uservalues, (err, result, fields) => {
            if (!err) {
              res.status(300).send("Success");
              con.release();
            } else {
              console.log(err);
              res.status(401).send('Error Occurred');
              con.release();
            }
          });
        } else {
          res.status(401).send('Error Occurred');
          con.release();
        }
        });
  })
}

exports.gigCard = (req, res, next) => {

  const booking = req.body;
  console.log("Inside gigCard");
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    
    var userQuery = 'SELECT d.dentist_name, d.office_name, d.phone_number, d.email, d.street_number, d.street_name, d.unit_number, ' +
      'd.city, d.province, d.postalcode, d.parking_options, b.dates, b.timings, b.reference_number FROM dentists d JOIN bookings b ON d.id = b.dentist_id WHERE b.id = ? LIMIT 1';
    values=[booking.bookingId];
    con.query(userQuery, values, (err, result, fields) => {
      if (!err) {
        if(!result.length) {
          return res.status(401).send({ error : "error message",});
        } else {
          return res.status(200).json(result);
        }
      } else {
        console.log(err);
        res.status(401).send({ error : "error message",});
        con.release();
      }
    });
  })
}

exports.gigCardOffice = (req, res, next) => {

  const booking = req.body;
  console.log("Inside gigCardOffice");
  console.log(booking);
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    
    var userQuery = 'SELECT t.temp_name, t.experience, t.expected_rate, t.type_of_practice, ' +
    't.dental_software, b.reference_number FROM temps t JOIN bookings b ON t.id = b.temp_id WHERE b.id = ? LIMIT 1';
    values=[booking.bookingId];
    con.query(userQuery, values, (err, result, fields) => {
      if (!err) {
        if(!result.length) {
          return res.status(401).send({ error : "error message",});
        } else {
          return res.status(200).json(result);
        }
      } else {
        console.log(err);
        res.status(401).send({ error : "error message",});
        con.release();
      }
    });
  })
}


exports.addTime = (req, res, next) => {

  const booking = req.body;
  console.log("Inside addTime");
  console.log(booking);
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    var query = 'SELECT temp_wage, is_from_gig FROM bookings WHERE id = ?';
        values=[booking.bookingId];
        con.query(query, values, (err, result, fields) => {
        if(!err) { 
          var userQuery = 'UPDATE gigs SET status = ? WHERE id = ?; UPDATE bookings SET temp_status = ?, temp_hours = ?, service_fee = ?, gst = ?, total_amount = ? WHERE id = ?;';
          var amount = parseInt(result[0].temp_wage) * booking.hours;
          var gst = amount * 0.05;
          var service_fee = amount *0.15;
          var total = amount + gst + service_fee;
          valuesB=["COMPLETE", result[0].is_from_gig, "COMPLETE", booking.hours, service_fee, gst, total, booking.bookingId];
          con.query(userQuery, valuesB, (err, result, fields) => {
            if (!err) {
              return res.status(200).json(result);
            } else {
              console.log(err);
              res.status(401).send({ error : "error message",});
              con.release();
            }
          });
        } else {
          res.status(401).send('Error Occurred');
          con.release();
        }
      });
  })
}
