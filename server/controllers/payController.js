const braintree = require("braintree");
const db = require('../database/database');

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "rh5zzfb9vpysnhqs",
  publicKey: "mq33w85nnd6jkhd9",
  privateKey: "32bfcfba42f3d1f5edc44ad49fa510f7"
});

exports.getGigDetails = (req, res, next) => {
  var gig = req.body.gigId;

  db((err, con) => {

    if(err){
      throw err;
    }    

    const query = "SELECT dental_entered_hours, temp_wage FROM `bookings` WHERE `is_from_gig` = ?";
    con.query(query, [gig], (err, result, fields) => {     
      if(!result.length) {
        return res.status(401).send({ error : "error message",});
      }

      let gigSelected = result[0];
      res
        .status(200)
        .json({
          wages: gigSelected.temp_wage,
          hours: gigSelected.dental_entered_hours
          }
        )

      con.release();
    })
  });
}

exports.getToken = (req, res, next) => {
    gateway.clientToken.generate({ 
      // customerId: "test"
    }, function (err, response) {
    // console.log(response.clientToken);
    res.send(response);
  });
};

exports.checkout = (req, res, next) => {
  var nonceFromTheClient = req.body.transaction.nonce;
  gateway.transaction.sale({
    amount: req.body.payAmount,
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  }, function(error, result) {
    console.log(result);
    if (result) {
      res.send(result);
    } else {
      res.status(500).send(error);
    }
  });
};