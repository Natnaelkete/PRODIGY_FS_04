import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import { generateToken } from "../utility/generateToken.js";

export const createAccount = asyncHandler(async (req, res, next) => {
  try {
    const { username, email, password, gender } = req.body;
    const existUser = await User.findOne({ username });
    const existEmail = await User.findOne({ email });

    if (existUser) {
      res.status();
      throw new Error("Username is already taken");
    }

    if (existEmail) {
      res.status();
      throw new Error("User already registered");
    }

    const newUser = await User.create({
      username,
      email,
      password,
      gender,
    });

    if (newUser) {
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export const LoginUsers = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      generateToken(user._id, res);

      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export const logout = asyncHandler(async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
