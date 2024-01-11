import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRouter from './routes/auth.route.js';
import manageError from './middleware/manageError.js';
import connectDB from './config/connectDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// connect to DB
connectDB();

// middlewares
// ? for parsing application/json
app.use(express.json());

// routes
app.use('/api/auth', userRouter);

// error handler
app.use(manageError);

// ? once connected to DB, start server
mongoose.connection.once('open', () => {
   console.log('connected to DB');
   // start server
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
