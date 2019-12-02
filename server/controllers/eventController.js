const db = require('../database/database');

/**
 * gets all the events to be shown on the Schedule for the temps.
 * @author Prabhdeep Singh
 * @version 1
 */
exports.getEvents = (req, res, next) => {
  const user = req.body;
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    if (user.role == 2) { //role for temps is 2
        var query = 'SELECT id FROM temps WHERE user_id = ?;'; //grabs the temp_id to be used in the next query
        values=[user.userId];
        con.query(query, values, (err, result, fields) => {
        if(!err) {
          var userQuery = 'SELECT b.dates, d.office_name, b.temp_status, b.dental_status, b.id from bookings b JOIN dentists d on b.dentist_id = d.id ' +
            'WHERE b.temp_id = ?';
          userValue=[result[0].id]; //temp_id
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
  });
}

/**
 * gets all the events for the schedule for an office.
 * @author : Prabhdeep Singh
 * @version : 1
 */
exports.getEventsOffice = (req, res, next) => {
  const user = req.body;
  console.log(user);
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    if (user.role == 1) { //role for offices is 1
        var events = [];
        var query = 'SELECT id FROM dentists WHERE user_id = ?;'; //gets the dentist_id to be used in the next query
        values=[user.userId];
        con.query(query, values, (err, result, fields) => {
        if(!err) {
          console.log(result);
          var userQuery = 'SELECT b.dates, t.temp_name, b.temp_status, b.dental_status, b.id from bookings b JOIN temps t on b.temp_id = t.id ' +
            'WHERE b.dentist_id = ?;';
          var dentist_id = result[0].id;
          userValue=[dentist_id];
          con.query(userQuery, userValue, (err, result, fields) => { //grabs all the bookings for this office
            if (!err) {
              if(!result.length) {
                console.log("No error");
              } else {
                  console.log(result);
                  events.push(result); // push bookings to the array to be sent back
              }
            } else {
              console.log(err);
              res.status(401).send({error : "error Message2",});
            }
            var userQuery = 'SELECT date, time FROM gigs WHERE status LIKE ? AND dentist_id = ?;'; // gets the gigs posted for this office
            userValue=["POSTED", dentist_id];
            con.query(userQuery, userValue, (err, result, fields) => {
              if (!err) {
                if(result.length) {
                    console.log(result);
                    events.push(result); // add gigs to the events to be sent back
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
