import Listing from "../Models/listing.model.js";
import User from "../Models/user.models.js";
import { errorHandler } from "../utils/error.js";
import bycryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "Abdul",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can not update this account"));
  try {
    if (req.body.password) {
      req.body.password = bycryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          //this set will make sure it update the user if even he is updating part of the info not all
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    ); //this will make sure the old info is replaced

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id }); //check whether the user has listing
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listing"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
  if (!user) return next(errorHandler(404, "User not found"));

  const { password: pass, ...rest } = user._doc;
  res.status(200).json(rest);
  } catch (error) {
    next(error)
  }
  
};
