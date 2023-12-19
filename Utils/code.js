const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

function getUsersWithoutBookingsForPastMonth() {
    const usersEmails = [
        'gauravgangola444@gmail.com'
        // Add more user emails here
    ];

    return usersEmails;
}

async function sendReminderEmails(users) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: "gaurav.gangola@aaveg.com",
            pass: "bzrqrlprzcomskrb"
        }
    });

    const mailOptions = {
        from: '"Team WTi" <gaurav.gangola@aaveg.com>',
        subject: 'Reminder: Book a Ride!',
        text: 'Dear user, it seems you haven\'t booked a ride in the past month. Book now and enjoy our services!'
    };

    for (const userEmail of users) {
        mailOptions.to = userEmail; // Set recipient's email dynamically
        try {
            await transporter.sendMail(mailOptions);
            console.log(`Reminder email sent to ${userEmail}`);
        } catch (error) {
            console.error(`Error sending email to ${userEmail}: ${error}`);
        }
    }
}

function scheduleJob() {
    const rule = new schedule.RecurrenceRule();
    rule.second = 0; // Run at the start of every minute

    const job = schedule.scheduleJob(rule, async () => {
        const users = getUsersWithoutBookingsForPastMonth();

        if (users.length > 0) {
            await sendReminderEmails(users);
        } else {
            console.log('No users found without bookings for the past month.');
        }
    });

    return job;
}

module.exports = { scheduleJob };

