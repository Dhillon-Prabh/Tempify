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

    const query = "SELECT temp_hours, temp_wage, service_fee, gst, total_amount FROM `bookings` WHERE id = ?";
    con.query(query, [gig], (err, result, fields) => {     
      if(!result.length) {
        return res.status(401).send({ error : "error message",});
      }

      let gigSelected = result[0];
      res
        .status(200)
        .json({
          wages: gigSelected.temp_wage,
          hours: gigSelected.temp_hours,
          serviceFee: gigSelected.service_fee,
          gst: gigSelected.gst,
          total: gigSelected.total_amount
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
    if (result) {
      if (result.success) {
        db((err, con) => {
          if(err){
            console.log(err);
            throw err;
          }
          var query = 'UPDATE bookings SET dental_status = "COMPLETE" WHERE id = ?;';
            var gig = req.body.gigId;
            con.query(query, [gig], (err, result, fields) => {
            if(!err) { 
                con.release();
            } else {
              res.status(401).send('Error Occurred');
              con.release();
            }
          });
        })
      }
      res.send(result);
    } else {
      res.status(500).send(error);
    }
  });
};