import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

// Import Routes
import { viewRouter, studentRouter, courseRouter, userRouter } from './routes';

// Config env
dotenv.config();

// Init app
const app = express();

// Set template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// 1. GLOBAL MIDDLEWARES

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(cors());

// 2. ROUTES
app.use('/', viewRouter);
app.use('/student', studentRouter);
app.use('/course', courseRouter);
app.use('/user', userRouter);

// Check Unhandled Routes
app.all('*', (req: Request, res: Response) => {
  res.status(404).send(`Can't find ${req.originalUrl} on this server!`);
});

export default app;
