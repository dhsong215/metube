import express from "express";
import { getJoin, postJoin, login } from "../controllers/userController";
import { getHome, videoSearch } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", getHome);
rootRouter.get("/search", videoSearch);
rootRouter.route("/join").get(getJoin).post(postJoin);

export default rootRouter;
