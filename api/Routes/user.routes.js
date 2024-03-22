import express from "express";
import {
  deleteUser,
  getUserListing,
  test,
  updateUser,
} from "../Controllers/user.controller.js";
import { signin } from "../Controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router(); //creating the router

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id",verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListing);

export default router;
