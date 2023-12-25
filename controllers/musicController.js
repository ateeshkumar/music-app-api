import slugify from "slugify";
import musicModel from "../models/musicModel.js";
import fs from "fs";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

export const createMusicController = async (req, res) => {
  try {
    const { name, type, language, movie, singer, release } = req.fields;
    const { logo, music } = req.files;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "all fields is required",
      });
    }
    if (!logo) {
      return res.status(400).send({
        success: false,
        message: "logo is required",
      });
    }
    if (!music) {
      return res.status(400).send({
        success: false,
        message: "music is required",
      });
    }
    const newMusic = await new musicModel({
      name,
      slug: slugify(name),
      type,
      movie,
      language,
      release,
      singer,
    });
    newMusic.logo.data = fs.readFileSync(logo.path);
    newMusic.music.data = fs.readFileSync(music.path);
    newMusic.logo.contentType = logo.type;
    newMusic.music.contentType = music.type;
    await newMusic.save();
    res.status(200).send({
      success: true,
      message: "music posted successfully",
      newMusic,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in creating music",
      error,
    });
  }
};
export const updateMusicController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, language, movie, singer, release } = req.fields;
    const { logo, music } = req.files;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "all fields is required",
      });
    }
    if (!logo) {
      return res.status(400).send({
        success: false,
        message: "logo is required",
      });
    }
    if (!music) {
      return res.status(400).send({
        success: false,
        message: "music is required",
      });
    }
    const newMusic = await musicModel.findByIdAndUpdate(id, {
      name,
      slug: slugify(name),
      type,
      movie,
      language,
      release,
      singer,
    });
    newMusic.logo.data = fs.readFileSync(logo.path);
    newMusic.music.data = fs.readFileSync(music.path);
    newMusic.logo.contentType = logo.type;
    newMusic.music.contentType = music.type;
    await newMusic.save();
    res.status(200).send({
      success: true,
      message: "music posted successfully",
      newMusic,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in creating music",
      error,
    });
  }
};

export const getAllMusicController = async (req, res) => {
  try {
    const music = await musicModel
      .find({})
      .select("-music")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "All music geting successfully",
      music,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in geting",
      error,
    });
  }
};
export const getSingleMusicController = async (req, res) => {
  try {
    const { slug } = req.params;
    const music = await musicModel.findOne({ slug }).select("-music");
    return res.status(200).send({
      success: true,
      message: "All music geting successfully",
      music,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in geting",
      error,
    });
  }
};
export const deleteMusicController = async (req, res) => {
  try {
    const { id } = req.params;
    const music = await musicModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "All music geting successfully",
      music,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in geting",
      error,
    });
  }
};

//individual finding
export const getLogoController = async (req, res) => {
  try {
    const { id } = req.params;
    const pic = await musicModel.findById(id).select("logo");
    if (pic.logo.data) {
      res.set("Content-type", pic.logo.contentType);
      res.status(200).send(pic.logo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in geting",
      error,
    });
  }
};
export const getMusicController = async (req, res) => {
  try {
    const { id } = req.params;
    const mic = await musicModel.findById(id).select("music");
    if (mic.music.data) {
      res.set("Content-type", mic.music.contentType);
      res.status(200).send(mic.music.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in geting",
      error,
    });
  }
};

//user music like
export const userLikeController = async (req, res) => {
  try {
    const { uid, mid } = req.params;
    const music = await musicModel.findById(mid);
    const user = await userModel.findById(uid);
    const session = await mongoose.startSession();
    session.startTransaction();
    music.like.push(user);
    user.likesmusic.push(music);
    await music.save({ session });
    await user.save({ session });
    await session.commitTransaction();
    return res.status(200).send({
      success: true,
      message: "User Like song successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in like",
      error,
    });
  }
};
export const userUnLikeController = async (req, res) => {
  try {
    const { uid, mid } = req.params;
    const music = await musicModel.findById(mid);
    const user = await userModel.findById(uid);
    const session = await mongoose.startSession();
    session.startTransaction();
    music.like.pull(user);
    user.likesmusic.pull(music);
    await music.save({ session });
    await user.save({ session });
    await session.commitTransaction();
    return res.status(200).send({
      success: true,
      message: "User Un Like song successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in like",
      error,
    });
  }
};
