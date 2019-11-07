const db = require('../database/database');

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password; 

  db((err, con) => {

    if(err){
      console.log(err);
      throw err;
    }

    var userQuery = "SELECT * FROM users";

    con.query(userQuery, (err, result, fields) => {
      res.send(result);

      if(result[0].email == email && result[0].password == password){
        res.status(200)
      }

      con.release();
    })
  }
)}



