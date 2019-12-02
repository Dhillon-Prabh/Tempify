/** Node module for email services. */
const nodemailer = require('nodemailer');
/** Node module for email templates. */
const hbs = require('nodemailer-express-handlebars');
/** Connection to database. */
const db = require('../database/database');

/**
 * Controller for sending emails. Recipients of all emails are hardcoded to 
 * prevent sending emails to the wrong recipient.
 * 
 * @author John Ham
 * @version 1.0
 */

/**
 * Nodemailer transporter used to send emails. Emails are sent using gmail from
 * the contacttempify@gmail.com email.
 */
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "contacttempify@gmail.com",
    pass: "Ab123456!"
  }
});

/**
 * Sets up the transporter to use handlebars for templates. Uses templates
 * with the extension .hbs that are located in the templates folder.
 */
transporter.use('compile', hbs({
  viewEngine: {
    extName: '.hbs',
    layoutsDir: 'templates/',
    partialsDir: 'templates/',
    defaultLayout: 'default.hbs'
  },
  viewPath: 'templates/',
  extName: '.hbs'
}));

/**
 * Sends an email when a gig is posted. An email is sent to all approved temps
 * that have a designation matching the gig's requirements.
 * 
 * @param req incoming request
 *            designation, userId
 * @param res response sent back to client
 * @param next used if another serverside controller is called
 */
exports.gigPostedEmail = async (req, res, next) => {
  // Hard-coded email to prevent emails sent to wrong recipient.
  const email = 'bcitfiveguys@gmail.com';
  // Email addresses to send emails to. Currently unused.
  var emails = "";
  var job = req.body;
  var gigEmailOption = {};

  // Connects to the database to get list of temps to send email to. 
  function connect() {
    return new Promise(function(resolve, reject) {
      db((err, con) => {
        if (err) {
          throw err;
        }
        var designation;
        switch (job.designation) {
          case "Assistant" :
            designation = " AND is_assistant = 1;";
            break;
          case "Registered Dental Hygienist" :
            designation = " AND is_hygienist = 1;";
            break;
          case "Receptionist" : 
            designation = " AND is_receptionist = 1;";
            break;
          default:
            break;
        }
            
        var query = "SELECT email FROM `temps` WHERE `is_approved` = 1" + designation;
        con.query(query, (err, result, fields) => {
          if (!result.length) {
            return res.status(401).send({
              error: "No temps to send email to",
            });
          } else {
            for (var s of result) {
              emails += s.email;
              emails += ", "
            }
          }
        });
        query = 'SELECT office_name, dentist_name, street_number, '
          + 'street_name, unit_number, city, province, '
          + 'parking_options FROM dentists WHERE user_id = ?;';
        values=[job.userId];
        con.query(query, values, (err, result, fields) => {
          if(!err) {
            resolve(result[0]);
            con.release();
          } else {
            con.release();
            return reject(err);
          }
        });
      });
    });
  }

  // Sets email options after retreiving data from the database. 
  await connect().then(function(dentalInfo) {
    // Email option for temp.
    gigEmailOption = {
      to: email, // List of recipients. Should use "emails" when going live
      subject: 'New Gig posted in Tempify',
      template: 'gig_posted_by_dental',
      context: {
        office_name: dentalInfo.office_name,
        dentist_name: dentalInfo.dentist_name,
        address: dentalInfo.street_number + " " + dentalInfo.street_name 
            + ", " + dentalInfo.unit_number,
        city_state: dentalInfo.city + ", " + dentalInfo.province,
        dates: job.date + " " + job.time,
        designation: job.designation,
        parking: dentalInfo.parking_options
      }
    }
  }).catch((err) => setImmediate(() => { throw err; }));
    
  // Sends the email.
  await transporter.sendMail(gigEmailOption, function(err, info) {
    if (err) {
      console.log(err);
    }
  });
}

/**
 * Sends an email to the dental office when a gig has been accepted.
 * 
 * @param req incoming request
 *            userId, gigId
 * @param res response sent back to client
 * @param next used if another serverside controller is called
 */
exports.gigAcceptedEmail = async (req, res, next) => {
  // Hard-coded email to prevent emails sent to wrong recipient.
  const email = 'fiveguysbcit@gmail.com';
  var values = req.body;
  var tempData = {};
  var emailOption = {};

  // Connects to the database to get temp data. 
  function connect() {
    return new Promise(function(resolve, reject) {
      db((err, con) => {
        if (err) {
          throw err;
        }
        var value = [req.decodedToken.userId];
        var query = "SELECT temp_name, email, designation, experience, dental_software, "
            + "is_assistant, is_hygienist, is_receptionist, city, expected_rate, "
            + "type_of_practice FROM `temps` WHERE `user_id` = ?";
        con.query(query, value, (err, result, fields) => {
          if (err) {
            return res.status(401).send({
              error: "Error getting data from database.",
            });
          } else {
            tempData = result[0];
          }
        });
    
        query = 'SELECT date, time FROM gigs WHERE id = ?;';
        con.query(query, [values.gigId], (err, result, fields) => {
          if(!err) {
            resolve(result[0]);
            con.release();
          } else {
            con.release();
            return reject(err);
          }
        });
      });
    });
  }

  // Sets email options after retrieving data from the database. 
  await connect().then(function(gigInfo) {
    var tempDesignation = "";
    if (tempData.is_assistant == 1) {
      tempDesignation += "Assistant ";
    }
    if (tempData.is_hygienist == 1) {
      tempDesignation += "Hygienist ";
    }
    if (tempData.is_receptionist == 1) {
      tempDesignation += "Receptionist "
    }
    // Email option for dental office.
    emailOption = {
      to: email,
      subject: 'Temp applied for gig',
      template: 'gig_accepted_to_dental',
      context: {
        temp_name: tempData.temp_name,
        email: tempData.email,
        designation: tempDesignation,
        experience: tempData.experience,
        dental_software: tempData.dental_software,
        type_of_practice: tempData.type_of_practice,
        city: tempData.city,
        expected_rate: tempData.expected_rate,
        timings: gigInfo.data + " " + gigInfo.time,
        to: email
      }
    }
  }).catch((err) => setImmediate(() => { throw err; }));
    
  // Sends the email. 
  await transporter.sendMail(emailOption, function(err, info) {
    if (err) {
      console.log(err);
    }
  });  
}

/**
 * Sends an email to the dental office when a temp has entered hours for a gig.
 * 
 * @param req incoming request
 *            bookingId
 * @param res response sent back to client
 * @param next used if another serverside controller is called
 */
exports.addTimeEmail = async (req, res, next) => {
  // Hard-coded email to prevent emails sent to wrong recipient.
  const email = 'fiveguysbcit@gmail.com';
  var values = req.body;
  var emailOption = {};

  // Connects to the database to get temp and booking data. 
  function connect() {
    return new Promise(function(resolve, reject) {
      db((err, con) => {
        if (err) {
          throw err;
        }
        var value = [values.bookingId];
        var query = "SELECT t.temp_name, t.designation, t.experience, "
            + "t.dental_software, t.is_assistant, t.is_hygienist, "
            + "t.is_receptionist, t.city, t.expected_rate, "
            + "t.type_of_practice, b.dates, b.timings FROM bookings b "
            + "JOIN temps t on b.temp_id = t.id WHERE b.id = ?;";
        con.query(query, value, (err, result, fields) => {
          if (err) {
            return res.status(401).send({
              error: "error message",
            });
            con.release();
          } else {
            resolve(result[0]);
            con.release();
          }
        });
      });
    });
  }

  // Sets email options after retrieving data from the database. 
  await connect().then(function(bookingInfo) {
    var tempDesignation = "";
    if (bookingInfo.is_assistant == 1) {
      tempDesignation += "Assistant ";
    }
    if (bookingInfo.is_hygienist == 1) {
      tempDesignation += "Hygienist ";
    }
    if (bookingInfo.is_receptionist == 1) {
      tempDesignation += "Receptionist "
    }
    // Email options for dental office.
    emailOption = {
      to: email,
      subject: 'Booking Id:' + values.bookingId 
          + ' has been completed by ' + bookingInfo.temp_name,
      template: 'completed_job',
      context: {
        temp_name: bookingInfo.temp_name,
        designation: tempDesignation,
        experience: bookingInfo.experience,
        dental_software: bookingInfo.dental_software,
        type_of_practice: bookingInfo.type_of_practice,
        city: bookingInfo.city,
        expected_rate: bookingInfo.expected_rate,
        timings: bookingInfo.dates + " " + bookingInfo.timings,
        to: email
      }
    }
  }).catch((err) => setImmediate(() => { throw err; }));
    
  // Sends the email. 
  await transporter.sendMail(emailOption, function(err, info) {
    if (err) {
      console.log(err);
    }
  });
}

/**
 * Sends an email to tempify's email and temp's email when a temp registers.
 * 
 * @param req incoming request
 *            email
 * @param res response sent back to client
 * @param next used if another serverside controller is called
 */
exports.tempRegisterEmail = async (req, res, next) => {
  // const email = req.body.email;  Uncomment when going live

  // Hard-coded email to prevent sending emails to wrong recipient.
  const email = 'bcitfiveguys@gmail.com';
  // Tempify's email.
  const adminEmail = 'contacttempify@gmail.com';

  // Email options for Tempify's email.
  let adminEmailOption = {
    to: adminEmail,
    subject: 'Temp Registration',
    template: 'admin_tempregister',
    context: {
      data: req.body,
      to: adminEmail
    }
  }

  // Sends email to Tempify's email.
  await transporter.sendMail(adminEmailOption, function(err, info) {
    if (err) {
      console.log(err);
    }
  });

  // Email options for temp.
  let tempEmailOption = {
    to: email,
    subject: 'Welcome To Tempify',
    template: 'welcome_book',
    context: {
      to: email
    }
  }

  // Sends email to temp.
  await transporter.sendMail(tempEmailOption, function(err, info) {
    if (err) {
      console.log(err);
    }
  });
}

/**
 * Sends an email to tempify's email and dental office when a dental office
 * registers.
 * 
 * @param req incoming request
 *            email
 * @param res response sent back to client
 * @param next used if another serverside controller is called
 */
exports.dentalRegisterEmail = async (req, res, next) => {
  // const email = req.body.email;  Uncomment when going live

  // Hard-coded email to prevent sending emails to wrong recipient.
  const email = 'fiveguysbcit@gmail.com';
  // Tempify's email.
  const adminEmail = 'contacttempify@gmail.com';

  // Email options for Tempify's email.
  let adminEmailOption = {
    to: adminEmail,
    subject: 'Dental Office Registration',
    template: 'admin_book',
      context: {
        data: req.body,
        to: adminEmail
      }
  } 

  // Sends email to Tempify's email.
  await transporter.sendMail(adminEmailOption, function(err, info) {
    if (err) {
      console.log(err);
    }
  });

  // Email options for dental office.
  let dentalEmailOption = {
    to: email,
    subject: 'Thanks for signing up',
    template: 'welcome_dental',
    context: {
      to: email
    }
  }

  // Sends email to dental office
  await transporter.sendMail(dentalEmailOption, function(err, info) {
    if (err) {
      console.log(err);
    }
  });
}

/**
 * Sends an email to Tempify's email when a user clicks the send message
 * inside Tempify's Contact Us section.
 * 
 * @param req incoming request
 *            cuName, cuEmail, cuMessage
 * @param res response sent back to client
 * @param next used if another serverside controller is called
 */
exports.contactUsEmail = async (req, res, next) => {
  const name = req.body.cuName
  const email = req.body.cuEmail;
  const message = req.body.cuMessage; 

  // Email options for Tempify's email.
  let emailOption = {
    to: 'contacttempify@gmail.com',
    subject: 'New contact from website',
    template: 'contact',
    context: {
      contactName: name,
      contactEmail: email,
      contactMessage: message
    }
  }

  // Sends email.
  await transporter.sendMail(emailOption, function(err, info) {
    if (err) {
      console.log(err);
    }
  });
}