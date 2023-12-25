import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/hashPassword.js";
import fs from "fs";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { userId, name, bio, dob, auth, password } = req.fields;
    const { profile } = req.files;
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "userId are required",
      });
    }
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name are required",
      });
    }
    if (!auth) {
      return res.status(400).send({
        success: false,
        message: "auth are required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "password are required",
      });
    }
    const existuser = await userModel.findOne({ auth });
    if (existuser) {
      return res.status(400).send({
        success: false,
        message: "User Already exist",
      });
    }
    const passwordbcr = await hashPassword(password);
    const newUser = await new userModel({
      userId,
      name,
      bio,
      dob,
      auth,
      password: passwordbcr,
    });
    newUser.profile.data = fs.readFileSync(profile.path);
    newUser.profile.contentType = profile.type;
    await newUser.save();
    res.status(200).send({
      success: true,
      message: "User register Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const userIdController = async (req, res) => {
  try {
    const { userId } = req.fields;
    const existUserId = await userModel.findOne({ userId });
    if (existUserId) {
      return res.status(400).send({
        success: false,
        message: "user id Already Exist",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user id created",
      userId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in username Checker",
      error,
    });
  }
};

//login
export const loginController = async (req, res) => {
  try {
    const { auth, password } = req.fields;
    if (!auth) {
      return res.status(400).send({
        success: false,
        message: "phone no is required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "password is required",
      });
    }
    const user = await userModel.findOne({ auth });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "user does not exist",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.status(400).send({
        success: false,
        message: "Password is not correct",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "3650d",
    });
    return res.status(200).send({
      success: true,
      message: "user login succesfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const updateuserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, name, bio, dob, auth, password } = req.fields;
    const { profile } = req.files;
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "userId are required",
      });
    }
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name are required",
      });
    }
    if (!auth) {
      return res.status(400).send({
        success: false,
        message: "auth are required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "password are required",
      });
    }
    const passwordbcr = await hashPassword(password);
    const newUser = await userModel.findByIdAndUpdate(
      id,
      {
        userId,
        name,
        bio,
        dob,
        auth,
        password: passwordbcr,
      },
      { new: true }
    );
    newUser.profile.data = fs.readFileSync(profile.path);
    newUser.profile.contentType = profile.type;
    await newUser.save();
    res.status(200).send({
      success: true,
      message: "User register Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update",
      error,
    });
  }
};

export const getAllUserController = async (req, res) => {
  try {
    const user = await userModel.find({});
    return res.status(200).send({
      success: true,
      message: "All user data",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in varification",
      error,
    });
  }
};
export const singleUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findOne({ userId });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Does not exist",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user data get successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in varification",
      error,
    });
  }
};
