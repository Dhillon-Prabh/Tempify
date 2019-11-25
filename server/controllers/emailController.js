const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const db = require('../database/database');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "contacttempify@gmail.com",
        pass: "Ab123456!"
    }
});

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

exports.gigPostedEmail = async (req, res, next) => {
    const email = 'bcitfiveguys@gmail.com';
    var emails = "";
    var dentalInfo;
    var job = req.body;
    var gigEmailOption = {};
    await db((err, con) => {

        if (err) {
          throw err;
        }
    
        var query = "SELECT email FROM `temps` WHERE `is_approved` = 1";
        con.query(query, (err, result, fields) => {
          if (!result.length) {
            return res.status(401).send({
              error: "error message",
            });
          } else {
            for (var s of result) {
                emails += s.email;
                emails += ", "
            }
          }
        });

        query = 'SELECT office_name, dentist_name, street_number, street_name, unit_number, city, province, parking_options FROM dentists WHERE user_id = ?;';
        values=[job.userId];
        con.query(query, values, (err, result, fields) => {
            if(!err) {
                dentalInfo = result[0];
            }
        });
        con.release();
    });

        console.log("DENTAL" + dentalInfo);
        gigEmailOption = {
            to: email, // list of receivers
            subject: 'New Gig posted in Tempify', // Subject line
            template: 'gig_posted_by_dental',
            context: {
                office_name: dentalInfo.office_name,
                dentist_name: dentalInfo.dentist_name,
                address: dentalInfo.street_number + " " + dentalInfo.street_name + ", " + dentalInfo.unit_number,
                city_state: dentalInfo.city + ", " + dentalInfo.province,
                dates: job.date + " " + job.time,
                designation: job.designation,
                parking: dentalInfo.parking_options
            }
        }
        console.log("GIG " + gigEmailOption);
    

    await transporter.sendMail(gigEmailOption, function(err, info) {
        console.log("IN" + gigEmailOption);

        if (err) {
            console.log(err);
        }
    });
}

exports.tempRegisterEmail = async (req, res, next) => {
    // const email = req.body.email;
    // const adminEmail = contact@tempify.co
    const email = 'bcitfiveguys@gmail.com';
    const adminEmail = 'contacttempify@gmail.com';
    let adminEmailOption = {
        to: adminEmail,
        subject: 'Temp Registration',
        template: 'admin_tempregister',
        context: {
            data: req.body,
            to: adminEmail
        }
    }

    await transporter.sendMail(adminEmailOption, function(err, info) {
        if (err) {
            console.log(err);
        }
    });

    let tempEmailOption = {
        to: email, // list of receivers
        subject: 'Welcome To Tempify', // Subject line
        template: 'welcome_book',
        context: {
            to: email
        }
    }

    await transporter.sendMail(tempEmailOption, function(err, info) {
        if (err) {
            console.log(err);
        }
    });
}

exports.dentalRegisterEmail = async (req, res, next) => {

    // const email = req.body.email;
    // const adminEmail = contact@tempify.co
    const email = 'fiveguysbcit@gmail.com';
    const adminEmail = 'contacttempify@gmail.com';

    let adminEmailOption = {
        to: adminEmail,
        subject: 'Dental Office Registration',
        template: 'admin_book',
        context: {
            data: req.body,
            to: adminEmail
        }
    }

    await transporter.sendMail(adminEmailOption, function(err, info) {
        if (err) {
            console.log(err);
        }
    });

    let dentalEmailOption = {
        to: email, // list of receivers
        subject: 'Thanks for signing up', // Subject line
        template: 'welcome_dental',
        context: {
            to: email
        }
    }

    await transporter.sendMail(dentalEmailOption, function(err, info) {
        if (err) {
            console.log(err);
        }
    });
}

exports.contactUsEmail = async (req, res, next) => {
    const name = req.body.cuName
    const email = req.body.cuEmail;
    const message = req.body.cuMessage; 
    
    let emailOption = {
        to: 'contacttempify@gmail.com', // list of receivers
        subject: 'New contact from website', // Subject line
        template: 'contact',
        context: {
            contactName: name,
            contactEmail: email,
            contactMessage: message
        }
    }

    await transporter.sendMail(emailOption, function(err, info) {
        if (err) {
            console.log(err);
        }
    });
}