const nodemailer = require('nodemailer');

function sendMail(toSend) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ordercompany66@gmail.com',
            pass: 'rakib2015'
        }
    });

    var mailOptions = {
        from: 'ordercompany66@gmail.com',
        to: toSend,
        subject: 'From Oil-Pump',
        text: 'You Are Registered for Our Company.'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendMail
};
