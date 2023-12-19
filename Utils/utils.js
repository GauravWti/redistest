const nodemailer = require("nodemailer");



async function mailSender(email, subject, html) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: "gaurav.gangola@aaveg.com",
            pass: "bzrqrlprzcomskrb"
        }
    });

    const info = await transporter.sendMail({
        from: `"Team WTi" gaurav.gangola@aaveg.com`,
        to: email,
        subject: subject,
        html: html,
      });

}


module.exports = mailSender;