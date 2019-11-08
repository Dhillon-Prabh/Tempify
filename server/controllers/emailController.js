

exports.contactUsEmail = (req, res, next) => {
    const name = req.body.cuName
    const email = req.body.cuEmail;
    const message = req.body.cuMessage; 

    console.log(name + email + message);
}