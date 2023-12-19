

// nodemailer transport
let transport = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
});
export const sendmailToVenderEmail=async(email, link)=>{


    await transport
    .sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Booking details from wti",
      html: `click on link : <b>${link}</b>
           `,
    })
    .then(() => {
     console.log('error sending mail')
    });


}
