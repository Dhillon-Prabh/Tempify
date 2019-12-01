const db = require('../database/database');

exports.tempData = (req, res, next) => {
    db((err, con) => {
        if(err){
            console.log(err);
            throw err;
        }
        
        var userQuery = 'SELECT b.temp_id, t.temp_name, t.email, t.phone, '
            + 't.license_number, SUM(total_amount) AS payment FROM bookings b JOIN temps '
            + 't ON b.temp_id = t.id WHERE dental_status LIKE "COMPLETE" GROUP BY temp_id;';
        con.query(userQuery, (err, result, fields) => {
            if(err) {
                return res.status(401).send({ error : "error message",});
            } else {
                return res.status(200).json(result);
            }
        });
    });
}


