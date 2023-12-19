

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { dbConnection } = require('./db.controller.js'); // Assuming dbConnection is exported from 'db.controller.js'
const router = require('./routes.js');
const cookieParser = require('cookie-parser');
const schedule = require('node-schedule');
const axios = require('axios');
const { allBlog } = require('./controller/BlogController.js');
const Redis = require('redis');
// const {scheduleJob}=require('./Utils/Scheduler.js');
const {jobEmail} =require('./Utils/Scheduler.js');
dotenv.config();

// const client=Redis.createClient();
const app = express();

const corsOptions = {
  origin: ['http://localhost:3000','http://localhost:3001'],
  credentials: true,
};



// Schedule the API call to trigger every 1 minute using node-schedule
 jobEmail(); // Cron pattern for every 1 minute


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// scheduleJob();


const PORT = 5000;

app.use('/0auth', router); // Assuming you want to use '/oauth' instead of '/0auth'
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnection(process.env.MONGO_DB_URI);
});

