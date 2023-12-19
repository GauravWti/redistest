const schedule = require('node-schedule');
const Redis = require('ioredis');
const nodemailer = require('nodemailer');

// Create Redis client
// const client = new Redis(/* add your Redis configurations */);

// const client = new Redis({
//   host: '54.205.77.3', // Update this with your AWS Redis endpoint
//   // port: 6379, // Default Redis port
//   // // password: 'your-redis-password', // If your Redis instance requires authentication
// });
const client = new Redis('redis://54.205.77.3:6379');




async function getUsersWithoutBookingsForPastMonth() {
  // Replace this with your logic to fetch users who haven't booked a ride in the past month from your database or source
  const usersEmails = [
    'gauravgangola444@gmail.com',
    // Add more user emails here
  ];

  return usersEmails;
}


async function sendEmail(user) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: 'gaurav.gangola@aaveg.com',
      pass: 'bzrqrlprzcomskrb',
    },
  });

  const mailOptions = {
    from: '"Team WTi" <gaurav.gangola@aaveg.com>',
    to: user.email,
    subject: 'Reminder: Book a Ride!',
    text: `Dear user, it seems you haven't booked a ride in the past month. Book now and enjoy our services!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${user.email}`);
  } catch (error) {
    console.error(`Error sending email to ${user.email}: ${error}`);
    throw error;
  }
}


// async function jobEmail() {
//   try {
//     const usersWithoutBookings = await getUsersWithoutBookingsForPastMonth();

//     for (const userEmail of usersWithoutBookings) {
//       await client.hmset('scheduled_emails', userEmail, JSON.stringify({ email: userEmail, schedule: '*/2 * * * *'}));
//     }

//     scheduleAndSendEmails();
//   } catch (error) {
//     console.error('Error getting users without bookings:', error);
//   }
// }


async function jobEmail() {
  try {
    const usersWithoutBookings = await getUsersWithoutBookingsForPastMonth();

    for (const userEmail of usersWithoutBookings) {
      const existingEmail = await client.hget('scheduled_emails', userEmail);

      if (!existingEmail) {
        await client.hmset('scheduled_emails', userEmail, JSON.stringify({ email: userEmail, schedule: '*/2 * * * *' }));
      }
    }

    await scheduleAndSendEmails();
  } catch (error) {
    console.error('Error getting users without bookings:', error);
  }
}


// Function to fetch scheduled emails from Redis and send them
// async function scheduleAndSendEmails() {
//   try {
//     const emails = await client.hgetall('scheduled_emails');
    
//     // Loop through scheduled emails and send them
//     for (const email of Object.values(emails)) {
//       const user = JSON.parse(email);

//       // Schedule email sending using node-schedule
//       const job = schedule.scheduleJob(user.email, user.schedule, () => {
//         sendEmail(user);
//       });

//       console.log(`Email scheduled for ${user.email} at ${user.schedule}`);
//     }

//     // Wait for all emails to be sent
//     await Promise.all(Object.values(emails).map(email => {
//       const user = JSON.parse(email);
//       return new Promise((resolve) => {
//         schedule.scheduleJob(user.email, user.schedule, async () => {
//           await sendEmail(user);
//           resolve();
//         });
//       });
//     }));

//     // After all emails are sent, clear Redis data
//     await client.flushdb();
//     console.log('All scheduled emails sent and Redis data cleared.');
//   } catch (err) {
//     console.error('Error sending scheduled emails or clearing Redis data:', err);
//   }
// }

async function scheduleAndSendEmails() {
  try {
    const emails = await client.hgetall('scheduled_emails');
    
    // Loop through scheduled emails and send them
    for (const emailKey of Object.keys(emails)) {
      const userEmail = emails[emailKey];
      const user = JSON.parse(userEmail);

      // Schedule email sending using node-schedule if not already sent
      const job = schedule.scheduleJob(user.email, user.schedule, async () => {
        await sendEmail(user);
        // After sending the email, remove the entry from Redis for this user
        await client.hdel('scheduled_emails', user.email);
        console.log(`Email sent and removed schedule for ${user.email} at ${user.schedule}`);
      });

      console.log(`Email scheduled for ${user.email} at ${user.schedule}`);
    }

    console.log('All scheduled emails set.');
  } catch (err) {
    console.error('Error setting scheduled emails:', err);
  }
}

module.exports = { scheduleAndSendEmails, jobEmail };



// const schedule = require('node-schedule');
// const redis = require('redis');
// const { promisify } = require('util');
// const nodemailer = require('nodemailer');

// // Create Redis client
// const client = redis.createClient({
//   host: '54.205.77.3', // Update this with your Redis endpoint
//   port: 6379, // Default Redis port
// });

// const hgetAsync = promisify(client.hget).bind(client);

// async function getUsersWithoutBookingsForPastMonth() {
//   // Replace this with your logic to fetch users who haven't booked a ride in the past month from your database or source
//   const usersEmails = [
//     'gauravgangola444@gmail.com',
//     // Add more user emails here
//   ];

//   return usersEmails;
// }

// async function sendEmail(user) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     port: 587,
//     auth: {
//       user: 'gaurav.gangola@aaveg.com',
//       pass: 'bzrqrlprzcomskrb',
//     },
//   });

//   const mailOptions = {
//     from: '"Team WTi" <gaurav.gangola@aaveg.com>',
//     to: user.email,
//     subject: 'Reminder: Book a Ride!',
//     text: `Dear user, it seems you haven't booked a ride in the past month. Book now and enjoy our services!`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`Reminder email sent to ${user.email}`);
//   } catch (error) {
//     console.error(`Error sending email to ${user.email}: ${error}`);
//     throw error;
//   }
// }

// async function jobEmail() {
//   try {
//     const usersWithoutBookings = await getUsersWithoutBookingsForPastMonth();

//     for (const userEmail of usersWithoutBookings) {
//       const existingEmail = await hgetAsync('scheduled_emails', userEmail);

//       if (!existingEmail) {
//         await client.hmset('scheduled_emails', userEmail, JSON.stringify({ email: userEmail, schedule: '*/2 * * * *' }));
//       }
//     }

//     await scheduleAndSendEmails();
//   } catch (error) {
//     console.error('Error getting users without bookings:', error);
//   }
// }

// async function scheduleAndSendEmails() {
//   try {
//     const emails = await client.hgetall('scheduled_emails');
    
//     for (const emailKey of Object.keys(emails)) {
//       const userEmail = emails[emailKey];
//       const user = JSON.parse(userEmail);

//       const job = schedule.scheduleJob(user.email, user.schedule, async () => {
//         await sendEmail(user);
//         await client.hdel('scheduled_emails', user.email);
//         console.log(`Email sent and removed schedule for ${user.email} at ${user.schedule}`);
//       });

//       console.log(`Email scheduled for ${user.email} at ${user.schedule}`);
//     }

//     console.log('All scheduled emails set.');
//   } catch (err) {
//     console.error('Error setting scheduled emails:', err);
//   }
// }

// module.exports = { scheduleAndSendEmails, jobEmail };
