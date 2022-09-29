import express from "express";
import {
  videoWatch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  videoDelete,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-fs]{24})", videoWatch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", videoDelete);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
