import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/user.routes.js";
import authRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express(); //creating the app
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("App is listening on port: 3000"); //creating the listener port
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

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
 