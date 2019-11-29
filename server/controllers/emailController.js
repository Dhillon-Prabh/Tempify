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
    var job = req.body;
    var gigEmailOption = {};
    function connect() {
        return new Promise(function(resolve, reject) {
            db((err, con) => {
    
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
                        resolve(result[0]);
                        con.release();
                    } else {
                        con.release();
                        return reject(err);
                    }
                });
            });
        })
    }

    await connect().then(function(dentalInfo) {
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
    }).catch((err) => setImmediate(() => { throw err; }));
    
    await transporter.sendMail(gigEmailOption, function(err, info) {
        if (err) {
            console.log(err);
        }
    });
}

exports.gigAcceptedEmail = async (req, res, next) => {
    const email = 'fiveguysbcit@gmail.com';
    var values = req.body;
    var tempData = {};
    var gigData = {};
    var emailOption = {};
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
                            error: "error message",
                        });
                    } else {
                        tempData = result[0];
                        console.log(tempData, "I AM TEMP DATA !!!!");
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
        })
    }

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
        emailOption = {
            to: email, // list of receivers
            subject: 'Temp applied for gig', // Subject line
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
    
    await transporter.sendMail(emailOption, function(err, info) {
        if (err) {
            console.log(err);
        }
    });
    
}

exports.addTimeEmail = async (req, res, next) => {
    const email = 'fiveguysbcit@gmail.com';
    var values = req.body;
    var emailOption = {};
    function connect() {
        return new Promise(function(resolve, reject) {
            db((err, con) => {
    
                if (err) {
                throw err;
                }
                var value = [values.bookingId];
                var query = "SELECT t.temp_name, t.designation, t.experience, t.dental_software, "
                    + "t.is_assistant, t.is_hygienist, t.is_receptionist, t.city, t.expected_rate, "
                    + "t.type_of_practice, b.dates, b.timings FROM bookings b JOIN temps t on b.temp_id = t.id "
                    + "WHERE b.id = ?;";
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
        })
    }

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
        emailOption = {
            to: email, // list of receivers
            subject: 'Booking Id:' + values.bookingId + ' has been completed by ' + bookingInfo.temp_name, // Subject line
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
    
    await transporter.sendMail(emailOption, function(err, info) {
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