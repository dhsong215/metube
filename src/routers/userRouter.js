import express from "express";
import {
  logout,
  userEdit,
  userRemove,
  getProfile,
  githubLogin,
  githubLoginFinish,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/githubLogin", githubLogin);
userRouter.get("/github/callback", githubLoginFinish);

export default userRouter;
