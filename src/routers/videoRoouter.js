import express from "express";
import {
  videoUpload,
  videoWatch,
  videoEdit,
  videoRemove,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", videoUpload);
videoRouter.get("/:id(\\d+)", videoWatch);
videoRouter.get("/:id(\\d+)/edit", videoEdit);
videoRouter.get("/:id(\\d+)/remove", videoRemove);

export default videoRouter;
