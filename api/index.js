import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/user.routes.js";
import authRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from './Routes/listing.route.js'

import path from 'path'


dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve()

const app = express(); //creating the app
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("App is listening on port: 3000"); //creating the listener port
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use('/api/listing',listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req,res)=>{
  res.sendfile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

//error handling middleware api

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
 