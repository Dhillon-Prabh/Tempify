const db = require('../database/database');
const jwt = require('jsonwebtoken');

exports.postLogin = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password; 

  db((err, con) => {

    if(err){
      throw err;
    }    

    const query = "SELECT email, password, id FROM `users` WHERE `email` = ? AND `password` = ?";

    con.query(query, [email, password], (err, result, fields) => {     
      if(!result.length) {
        return  res.status(401).send({ error : "error message" });
      }

      let loadedUser = result[0];
        const token = jwt.sign(
          {
            email: loadedUser.email, 
            userId: loadedUser.id
          }, 'secret', { 
            expiresIn: '1h' 
          }
        );
  
        res
          .status(200)
          .json({
            token: token,
            userId: loadedUser.id
            }
          )

      con.release();
    })
  }
)}



