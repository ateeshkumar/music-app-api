import express from "express";
import {
  getAllUserController,
  loginController,
  registerController,
  singleUserController,
  updateuserController,
  userIdController,
} from "../controllers/authController.js";
import { adminAccess, requestSignIn } from "../midileware/authMidlewire.js";

const route = express.Router();

route.post("/register", registerController);
route.post("/user-id", userIdController);
route.post("/login", loginController);

route.put("/user-update/:id", requestSignIn, updateuserController);
route.get("/all-user", adminAccess, getAllUserController);
route.get("/user/:userId", requestSignIn, singleUserController);
export default route;
