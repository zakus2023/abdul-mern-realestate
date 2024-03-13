import express from "express";
import { test } from "../Controllers/user.controller.js";
import { signin } from "../Controllers/auth.controller.js";

const router = express.Router(); //creating the router

router.get("/test",test);


export default router;
