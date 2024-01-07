import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

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

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
