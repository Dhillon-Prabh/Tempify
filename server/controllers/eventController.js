const db = require('../database/database');

exports.getEvents = (req, res, next) => {
  const user = req.body;
  console.log(user);
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
    if (user.role == 2) { //role for temps is 2
        var userQuery = 'SELECT b.dates, d.office_name, b.temp_status, b.dental_status from bookings b JOIN dentists d on b.dentist_id = d.id ' +
            'WHERE b.temp_id = ?';
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
    }
  })
}
