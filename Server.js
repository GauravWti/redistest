
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from './db.controller.js';
import router from './routes.js';

dotenv.config();

const app = express();

const corsOptions = {
      origin: ['http://localhost:3000'],
      credentials: true,
    };
    
    app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT =5000;

app.use('/0auth', router);
app.listen(PORT, () => {
     
      console.log(`Server is running on port ${PORT}`);
      dbConnection(process.env.MONGO_DB_URI);
 });