const db = require('../database/database');
const jwt = require('jsonwebtoken');

exports.postLogin = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;
  db((err, con) => {

    if (err) {
      throw err;
    }

    const query = "SELECT email, password, id, role FROM `users` WHERE `email` = ? AND `password` = ?";
    con.query(query, [email, password], (err, result, fields) => {
      if(!result.length) {
        return res.status(401).send({
          error: "error message",
        });
      } else if(result[0].role == 1) {
        var userQuery = 'SELECT id, group_id FROM dentists WHERE user_id = ? LIMIT 1;';
        values=[result[0].id];
        con.query(userQuery, values, (err, row, fields) => {
          if(!err) {
            console.log("no error proceeding to resolve");
            let loadedUser = result[0];
            let office = row[0];
            const token = jwt.sign(
              {
                email: loadedUser.email, 
                userId: loadedUser.id,
                officeId: office.id,
                groupId: office.group_id,
                userType:'office'
              }, 'secret', { 
                expiresIn: '1h' 
              }
            );
      
            res
              .status(200)
              .json({
                token: token,
                userId: loadedUser.id,
                role: loadedUser.role,
                officeId: office.id,
                groupId: office.group_id,
                userType: 'office'
                }
              )
            con.release();
          } else {
            console.log("error fetching office id");
            con.release();
          }
        });
      } else {
        let loadedUser = result[0];
          const token = jwt.sign(
            {
              email: loadedUser.email, 
              userId: loadedUser.id,
              officeId: -1,
              groupId: -1,
              userType:'temp'
            }, 'secret', { 
              expiresIn: '1h' 
            }
          );
    
          res
            .status(200)
            .json({
              token: token,
              userId: loadedUser.id,
              role: loadedUser.role,
              officeId: -1,
              groupId: -1,
              userType: 'temp'
            })
        con.release();
      }
    })
  })
}

exports.getTempDashboardInformation = (req, res, next) => {
  const user = req.decodedToken;
  db((err, con) => {
    if(err){
      console.log(err);
      throw err;
    }
  
    var userQuery = 'SELECT temp_name, experience, expected_rate, city, designation, type_of_practice, ' +
      'dental_software, imagename, phone FROM temps WHERE user_id = ? LIMIT 1';
    values=[user.userId];
    con.query(userQuery, values, (err, result, fields) => {
      if(!result.length) {
        return res.status(401).send({ error : "error message",});
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    });
  })
}
