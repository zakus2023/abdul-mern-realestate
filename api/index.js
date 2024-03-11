import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log(err);
})

const app = express(); //creating the app

app.listen(3000, () => {
    console.log("App is listening on port: 3000"); //creating the listener port
  });