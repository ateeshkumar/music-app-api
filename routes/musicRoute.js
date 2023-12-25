import express from "express";
import {
  createMusicController,
  deleteMusicController,
  getAllMusicController,
  getLogoController,
  getMusicController,
  getSingleMusicController,
  updateMusicController,
  userLikeController,
  userUnLikeController,
} from "../controllers/musicController.js";
import { requestSignIn } from "../midileware/authMidlewire.js";

const product = express.Router();

product.post("/create-music", createMusicController);

product.put("/update-music/:id", updateMusicController);
product.put("/music-like/:uid/:mid", requestSignIn, userLikeController);
product.put("/music-unlike/:uid/:mid", requestSignIn, userUnLikeController);

product.get("/all-music", getAllMusicController);
product.get("/music/:slug", getSingleMusicController);
product.get("/music-logo/:id", getLogoController);
product.get("/music-music/:id", getMusicController);

product.delete("/delete-music/:id", deleteMusicController);

export default product;
