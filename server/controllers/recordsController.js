const db = require('../database/database');

/**
 * 
 * @author John Ham
 * @version 1.0
 */

exports.getRecords = (req, res, next) => {
  db((err, con) => {
    if(err){
      throw err;
    }
    if(req.decodedToken.userType === "temp") {
      var query = 'SELECT id FROM temps WHERE user_id = ?;';
      values=[req.decodedToken.userId];
    } else if (req.decodedToken.userType === "office") {
      var query = 'SELECT id FROM dentists WHERE user_id = ?;';
      values=[req.body.userId];
    }
    con.query(query, values, (err, result, fields) => {
      if (!err) {
        let bookingQuery = '';
        if(req.decodedToken.userType === "temp") {
          bookingQuery = "SELECT d.office_name, d.street_number, d.street_name, d.unit_number, d.city, d.province, d.postalcode, d.parking_options, d.phone_number , d.email ,b.reference_number, b.dates, b.temp_status FROM bookings b JOIN dentists d ON b.dentist_id = d.id WHERE b.temp_status LIKE 'COMPLETE' AND b.dental_status LIKE 'COMPLETE' AND b.temp_id = ?";
        } else {
          bookingQuery = "SELECT b.temp_status, t.temp_name, t.type_of_practice, t.dental_software, t.experience, t.city, t.expected_rate,  b.dates, b.reference_number FROM bookings b JOIN temps t ON b.temp_id = t.id WHERE b.temp_status LIKE 'COMPLETE' AND b.dental_status LIKE 'COMPLETE' AND b.dentist_id = ?";
        }
        con.query(bookingQuery, [result[0].id] , (err, result, fields) => {
          if (err) {
            console.log(err);
          }
          if(!result.length) {
            res.status(401).send({ error : "no result",});
            con.release();
          } else {
            res.status(200).json(result);
            con.release();
          }
        });
      } else {
        console.log(err);
      }
    })
  })
}