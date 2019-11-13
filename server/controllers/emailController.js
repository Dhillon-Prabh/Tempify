const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "fiveguysbcit@gmail.com",
        pass: "Ab123456!"
    }
});

// exports.loginEmail = async (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password; 

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         to: 'bcitfiveguys@gmail.com', // list of receivers
//         subject: 'Hello ✔', // Subject line
//         text: "email: " + email + " password: " + password
//     });

//     console.log('Message sent: %s', info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

exports.contactUsEmail = async (req, res, next) => {
    const name = req.body.cuName
    const email = req.body.cuEmail;
    const message = req.body.cuMessage; 

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: testAccount.user, // generated ethereal user
    //         pass: testAccount.pass // generated ethereal password
    //     }
    // });

    await transporter.use('compile', hbs({
        viewEngine: {
            extName: '.hbs',
            layoutsDir: './templates/',
            partialsDir: './templates/',
            defaultLayout: 'contact.hbs'
        },
        viewPath: './templates/',
        extName: '.hbs'
    }));

    let option = {
        to: 'bcitfiveguys@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Plswork',
        template: 'contact',
        context: {
            contactName: name,
            contactEmail: email,
            contactMessage: message
        }
    }

    await transporter.sendMail(option, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    });

    // send mail with defined transport object
    // let info = await transporter.sendMail({
    //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //     to: 'bar@example.com, baz@example.com', // list of receivers
    //     subject: 'Hello ✔', // Subject line
    //     text: 'Hello world?', // plain text body
    //     html: '<b>Hello world?</b>' // html body
    // });

    // console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    console.log(name + email + message);
}