import express from "express";
import {
  videoWatch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  videoDelete,
} from "../controllers/videoController";
import {
  protectorMiddleware,
  uploadVideo,
  videoOwnerProtector,
} from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-fs]{24})", videoWatch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware, videoOwnerProtector)
  .get(getEdit)
  .post(postEdit);
videoRouter.get(
  "/:id([0-9a-f]{24})/delete",
  protectorMiddleware,
  videoOwnerProtector,
  videoDelete
);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(uploadVideo.single("video"), postUpload);

export default videoRouter;
