/** Connection to database. */
const db = require('../database/database');

/**
 * Controller for getting temp payment info from the database. This should be
 * incorporated into the existing admin page of Tempify. 
 * 
 * @author John Ham
 * @author Hoo Joo Lee
 * @version 1.0
 */

/**
 * Sends data about the temp payments to the client.
 * 
 * @param req incoming request
 * @param res response sent back to client
 * @param next used if another serverside controller is called
 */
exports.tempData = (req, res, next) => {
    db((err, con) => {
        if(err){
            console.log(err);
            throw err;
        }
        var userQuery = 'SELECT b.temp_id, (SELECT CONCAT(DATE_FORMAT(start_date, "%b %e, %Y"), " - ", '
            + 'DATE_FORMAT(DATE_ADD(start_date, INTERVAL 14 DAY), "%b %e, %Y")) FROM payroll WHERE pay_status = 0 LIMIT 1) '
            + 'AS period, t.temp_name, t.email, t.phone, t.license_number, FORMAT(SUM(temp_wage * temp_hours), 2) AS payment '
            + 'FROM bookings b JOIN temps t ON b.temp_id = t.id WHERE dental_status LIKE "COMPLETE" '
            + 'AND str_to_date(dates, "%Y-%m-%d") >= (SELECT start_date FROM payroll WHERE pay_status = 0 LIMIT 1) '
            + 'AND str_to_date(dates, "%Y-%m-%d") < (SELECT DATE_ADD(start_date, INTERVAL 14 DAY) FROM payroll ' 
            + 'WHERE pay_status = 0 LIMIT 1) GROUP BY temp_id;';
        con.query(userQuery, (err, result, fields) => {
            if(err) {
                return res.status(401).send({ error : "error message",});
            } else {
                return res.status(200).json(result);
            }
        });
    });
}

/**
 * Sets the current payment period status to paid and returns information about the
 * next payment period.
 * 
 * @param req incoming request
 * @param res response sent back to client
 * @param next used if another serverside controller is called
 */
exports.confirmPayment = (req, res, next) => {
    db((err, con) => {
        if(err){
            console.log(err);
            throw err;
        }
        
        return new Promise(function (resolve, reject) {
            var updateStatusQuery = 'UPDATE payroll SET pay_status = 1, updated_at = SYSDATE() WHERE pay_status = 0 ;';
            con.query(updateStatusQuery, (err, result, fields) => {
              if(!err) {
                console.log("no error proceeding to resolve");
                resolve(result);
              } else {
                reject(err);
              }
            });
          })
          .then(function(result) {
            var insertPeriodQuery = 'INSERT INTO payroll (start_date, pay_status, created_at, updated_at) VALUES '
                + '((SELECT DATE_ADD(MAX(p.start_date), INTERVAL 14 DAY) FROM payroll p), 0, SYSDATE(), SYSDATE());';
              con.query(insertPeriodQuery, (err, result, fields) => {
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
