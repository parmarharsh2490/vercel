import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import Assistant from './Assistant.model.js';
import { dbState } from './utils/dbState.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.get('/', (_, res) => {
  res.send('Server is running!');
});

app.get('/api/v1/checkTime', async (_, res) => {
    await mongoose.connect(process.env.MONGODB_URL);
    const newData = await Assistant.find({});
    res.status(200).json(JSON.stringify(newData));
});

export default app;


