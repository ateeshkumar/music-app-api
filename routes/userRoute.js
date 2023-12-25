import express from "express";
import {
  createPlaylistController,
  deletePlaylistController,
  followController,
  getPlaylistController,
  getSinglePlaylistController,
  likePlaylistController,
  removeFollowController,
  unFollowController,
  unLikePlaylistController,
  updatePlaylistController,
} from "../controllers/userController.js";

const userroute = express.Router();

userroute.post("/create-playlist/:uid", createPlaylistController);
userroute.delete("/delete-playlist/:pid/:uid", deletePlaylistController);
userroute.put("/update-playlist/:pid/:uid", updatePlaylistController);
userroute.get("/get-playlist/:uid", getPlaylistController);
userroute.get("/single-playlist/:pid", getSinglePlaylistController);
userroute.put("/like-playlist/:pid/:uid", likePlaylistController);
userroute.put("/unlike-playlist/:pid/:uid", unLikePlaylistController);

userroute.put("/follow/:uid/:fid", followController);
userroute.put("/unfollow/:uid/:fid", unFollowController);
userroute.put("/remove/:uid/:fid", removeFollowController);

export default userroute;
