import express from "express";
import { join, login } from "../controllers/userController";
import { getHome, videoSearch } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", getHome);
globalRouter.get("/search", videoSearch);

export default globalRouter;
