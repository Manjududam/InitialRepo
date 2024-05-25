import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import jobsRouter from './routes/jobs.route.js';

import { errorHandler } from "./handlers/errorHandler.js";

// Express
const app = express();

// JSON parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Middleware for handling CORS Policy
app.use(cors({
    origin: "*", // Allow requests from all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// DB Connection
dotenv.config();
const { MONGO_DB_URL, PORT } = process.env;

mongoose.connect(MONGO_DB_URL)
    .then(() => {
        console.log(`Connected to MongoDB`);
        // Start server
        app.listen(PORT || 8088, () => {
            console.log(`Server is running on port ${PORT || 8088}`);
        });
    })
    .catch((error) => {
        console.log(`Error: ${error}`);
    });

// Error handling middleware
app.use(errorHandler);

// Routes
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/data', jobsRouter);
