import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRoouter";
import userRouter from "./routers/userRouter";

const app = express();
const logger = morgan("dev");

const PORT = 4000;

app.listen(PORT, () => console.log(`listening on PORT${PORT}`));

const controller = (req, res) => {
  res.send("hi");
};

app.use(logger);
app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);
