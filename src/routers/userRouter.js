import express from "express";
import { userEdit, userRemove } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", userEdit);
userRouter.get("/remove", userRemove);

export default userRouter;
