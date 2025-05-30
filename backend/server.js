import express from 'express';
import accountsRouter from './routes/accounts.js';
import trainingRouter from './routes/training.js';
import dotenv from "dotenv"
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());  // allows us to accept json data in request body
app.use('/api/accounts', accountsRouter);
app.use('/api/training', trainingRouter);

app.listen(5000, () => {
    connectDB();
    console.log("Express server is running");
})