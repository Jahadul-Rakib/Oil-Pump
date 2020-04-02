const nodeMailer = require('nodemailer');

function sendMail(toSend) {
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {user: 'ordercompany66@gmail.com', pass: 'rakib2015'}
    });

    let mailOptions = {
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
