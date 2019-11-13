const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "fiveguysbcit@gmail.com",
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

exports.tempRegisterEmail = async (req, res, next) => {
    // const email = req.body.email;
    // const adminEmail = contact@tempify.co
    const email = 'bcitfiveguys@gmail.com';
    const adminEmail = 'fiveguysbcit@gmail.com';
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
    const email = 'bcitfiveguys@gmail.com';
    const adminEmail = 'fiveguysbcit@gmail.com';

    let adminEmailOption = {
        to: adminEmail,
        subject: 'Temp Registration',
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
        to: 'bcitfiveguys@gmail.com', // list of receivers
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