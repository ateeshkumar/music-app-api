import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import playListModel from "../models/playListModel.js";
import slugify from "slugify";

export const followController = async (req, res) => {
  try {
    const { uid, fid } = req.params;
    const user = await userModel.findById(uid);
    const follow = await userModel.findById(fid);
    const session = await mongoose.startSession();
    session.startTransaction();
    follow.followers.push(user);
    user.following.push(follow);
    await user.save({ session });
    await follow.save({ session });
    await session.commitTransaction();
    return res.status(200).send({
      success: true,
      message: "Follow successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in follow",
    });
  }
};
export const unFollowController = async (req, res) => {
  try {
    const { uid, fid } = req.params;
    const user = await userModel.findById(uid);
    const follow = await userModel.findById(fid);
    const session = await mongoose.startSession();
    session.startTransaction();
    follow.followers.pull(user);
    user.following.pull(follow);
    await user.save({ session });
    await follow.save({ session });
    await session.commitTransaction();
    return res.status(200).send({
      success: true,
      message: "Un Follow successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in follow",
    });
  }
};
export const removeFollowController = async (req, res) => {
  try {
    const { uid, fid } = req.params;
    const user = await userModel.findById(uid);
    const follow = await userModel.findById(fid);
    const session = await mongoose.startSession();
    session.startTransaction();
    user.followers.pull(user);
    follow.following.pull(follow);
    await user.save({ session });
    await follow.save({ session });
    await session.commitTransaction();
    return res.status(200).send({
      success: true,
      message: "Remove Followers successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in follow",
    });
  }
};

// playlist controller

export const createPlaylistController = async (req, res) => {
  try {
    const { uid } = req.params;
    const { name } = req.fields;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    const user = await userModel.findById(uid);
    const playlist = await new playListModel({
      name,
      slug: slugify(name),
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await playlist.save({ session });
    user.playlist.push(playlist);
    await user.save({ session });
    await session.commitTransaction();
    await playlist.save();
    return res.status(200).send({
      success: true,
      message: "playlist is created",
      playlist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create playlist",
    });
  }
};
export const updatePlaylistController = async (req, res) => {
  try {
    const { pid, uid } = req.params;
    const { name } = req.fields;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    const user = await userModel.findById(uid);
    const playlist = await playListModel.findByIdAndUpdate(pid, {
      name,
      slug: slugify(name),
      user,
    });
    await playlist.save();
    return res.status(200).send({
      success: true,
      message: "playlist updated successfully",
      playlist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create playlist",
    });
  }
};
export const deletePlaylistController = async (req, res) => {
  try {
    const { pid, uid } = req.params;
    const user = await userModel.findById(uid);
    const playlist = await playListModel.findByIdAndDelete(pid);
    const session = await mongoose.startSession();
    session.startTransaction();
    user.playlist.pull(playlist);
    await user.save({ session });
    await session.commitTransaction();
    return res.status(200).send({
      success: true,
      message: "playlist deleted succesfully",
      playlist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create playlist",
      error,
    });
  }
};

export const getPlaylistController = async (req, res) => {
  try {
    const { uid } = req.params;
    const playlist = await userModel.findById(uid);
    const allplaylist = playlist.playlist;
    return res.status(200).send({
      success: true,
      message: "all playlist get successfully",
      allplaylist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in geting playlist",
      error,
    });
  }
};
export const getSinglePlaylistController = async (req, res) => {
  try {
    const { pid } = req.params;
    const playlist = await playListModel.findById(pid);
    return res.status(200).send({
      success: true,
      message: "all playlist get successfully",
      playlist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in geting playlist",
      error,
    });
  }
};

//like and unlike playlist controller

export const likePlaylistController = async (req, res) => {
  try {
    const { pid, uid } = req.params;
    const playlist = await playListModel.findById(pid);
    const user = await userModel.findById(uid);
    const session = await mongoose.startSession();
    session.startTransaction();
    playlist.like.push(user);
    user.likesplaylist.push(playlist);
    await playlist.save({ session });
    await user.save({ session });
    await session.commitTransaction();
    return res.status(200).send({
      success: true,
      message: "like playlist successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      message: "error in like playlist",
      error,
    });
  }
};
export const unLikePlaylistController = async (req, res) => {
  try {
    const { pid, uid } = req.params;
    const playlist = await playListModel.findById(pid);
    const user = await userModel.findById(uid);
    const session = await mongoose.startSession();
    session.startTransaction();
    playlist.like.pull(user);
    user.likesplaylist.pull(playlist);
    await playlist.save({ session });
    await user.save({ session });
    await session.commitTransaction();
    return res.status(200).send({
      success: true,
      message: "unlike playlist successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      message: "error in like playlist",
      error,
    });
  }
};

// add music and removie music in playlist
export const addMusicinPlaylistcontroller = async (req, res) => {
  try {
    const { uid, mid, pid } = req.params;
    const user = await userModel.findById(uid);
    const music = await musicModel.findById(mid);
    const playlist = await playListModel.findById(pid).populate("user");
    if (user._id === playlist.user._id) {
      const session = await mongoose.startSession();
      session.startTransaction();
      playlist.music.push(music);
      await playlist.save({ session });
      await session.commitTransaction();
      return res.status(200).send({
        success: true,
        message: "music added successfully",
        playlist,
      });
    }
    return res.status(404).send({
      success: false,
      message: "user id id not matched",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in add music in playlist",
      error,
    });
  }
};
export const removieMusicinPlaylistcontroller = async (req, res) => {
  try {
    const { uid, mid, pid } = req.params;
    const user = await userModel.findById(uid);
    const music = await musicModel.findById(mid);
    const playlist = await playListModel.findById(pid).populate("user");
    if (user._id === playlist.user._id) {
      const session = await mongoose.startSession();
      session.startTransaction();
      playlist.music.pull(music);
      await playlist.save({ session });
      await session.commitTransaction();
      return res.status(200).send({
        success: true,
        message: "music added successfully",
        playlist,
      });
    }
    return res.status(404).send({
      success: false,
      message: "user id id not matched",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in add music in playlist",
      error,
    });
  }
};
