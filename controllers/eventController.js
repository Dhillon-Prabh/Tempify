const db = require('../database/database');

exports.getEvents = (req, res, next) => {
  const user = req.body;
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    if (user.role == 2) { 
        var query = 'SELECT id FROM temps WHERE user_id = ?;';
        values=[user.userId];
        con.query(query, values, (err, result, fields) => {
        if(!err) {
          var userQuery = 'SELECT b.dates, d.office_name, b.temp_status, b.dental_status, b.id from bookings b JOIN dentists d on b.dentist_id = d.id ' +
            'WHERE b.temp_id = ?';
          userValue=[result[0].id];
          con.query(userQuery, userValue, (err, result, fields) => {
            if(!result.length) {
                res.status(401).send({ error : "error message",});
                con.release();
            } else {
                res.status(200).json(result);
                con.release();
            }
        });
        } else {
            res.status(401).send({error : "error Message",});
            con.release();
        }
        });
    }
  })
}

exports.getEventsOffice = (req, res, next) => {
  console.log("getting office events");
  const user = req.body;
  console.log(user);
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    if (user.role == 1) { 
        var events = [];
        var query = 'SELECT id FROM dentists WHERE user_id = ?;';
        values=[user.userId];
        con.query(query, values, (err, result, fields) => {
        if(!err) {
          console.log(result);
          var userQuery = 'SELECT b.dates, t.temp_name, b.temp_status, b.dental_status, b.id from bookings b JOIN temps t on b.temp_id = t.id ' +
            'WHERE b.dentist_id = ?;';
          var dentist_id = result[0].id;
          userValue=[dentist_id];
          con.query(userQuery, userValue, (err, result, fields) => {
            console.log("bookings result");
            if (!err) {
              if(!result.length) {
                console.log("No error");
              } else {
                  console.log(result);
                  events.push(result);
              }
            } else {
              console.log(err);
              res.status(401).send({error : "error Message2",});
            }
            var userQuery = 'SELECT date, time FROM gigs WHERE status LIKE ? AND dentist_id = ?;';
            userValue=["POSTED", dentist_id];
            con.query(userQuery, userValue, (err, result, fields) => {
              if (!err) {
                if(result.length) {
                    console.log(result);
                    events.push(result);
                }
                res.status(200).json(events);         
              } else {
                console.log(err);
                res.status(401).send({error : "error Message2",});
              }
            });
        });
        } else {
          console.log(err);
          res.status(401).send({error : "error Message2",});
          con.release();
        }
        });
    }
  })
}
