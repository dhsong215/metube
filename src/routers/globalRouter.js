import express from "express";
import { getHome } from "../controllers/homeController";
import { join, login } from "../controllers/userController";
import { videoSearch } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", getHome);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", videoSearch);

export default globalRouter;
