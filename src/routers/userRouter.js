import express from "express";
import {
  logout,
  getUserEdit,
  postUserEdit,
  githubLogin,
  githubLoginFinish,
  getChangePassword,
  postChangePassword,
  userProfile,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  uploadProfileImage,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/githubLogin", publicOnlyMiddleware, githubLogin);
userRouter.get("/github/callback", publicOnlyMiddleware, githubLoginFinish);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getUserEdit)
  .post(uploadProfileImage.single("avatar"), postUserEdit);
userRouter
  .route("/changepassword")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.route("/:id").get(userProfile);

export default userRouter;
