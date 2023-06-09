const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = (mailOptions) => {
    console.log(mailOptions);
    return new Promise((resolve, reject) => {
        sgMail.send(mailOptions, (error, result) => {
            if (error){ 
                return reject(error)
            };
            return resolve(result);
        });
    });
}
