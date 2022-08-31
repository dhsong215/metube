import express from "express";
import {
  logout,
  userEdit,
  userRemove,
  getProfile,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);

export default userRouter;
