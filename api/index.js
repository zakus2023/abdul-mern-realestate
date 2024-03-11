import express from "express";
import mongoose from "mongoose"

mongoose.connect("")

const app = express(); //creating the app

app.listen(3000, () => {
    console.log("App is listening on port: 3000"); //creating the listener port
  });