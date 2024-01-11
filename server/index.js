import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRouter from './routes/auth.route.js';
import manageError from './middleware/manageError.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// connect to DB
mongoose
   .connect(process.env.MONGO_URI)
   .then(() => {
      console.log('connected to DB');
   })
   .catch((err) => {
      console.log(err);
   });

// middlewares
// ? for parsing application/json
app.use(express.json());

// start server
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

// routes
app.use('/api/auth', userRouter);

// error handler

app.use(manageError);
