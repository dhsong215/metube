import express from "express";
import { videoEdit, videoRemove } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/edit", videoEdit);
videoRouter.get("/remove", videoRemove);

export default videoRouter;
