import express from "express";
import {
  logout,
  userEdit,
  userRemove,
  getProfile,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", userEdit);
userRouter.get("/remove", userRemove);
userRouter.get("/:id", getProfile);

export default userRouter;
