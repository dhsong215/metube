import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRoouter";
import userRouter from "./routers/userRouter";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

export default app;
