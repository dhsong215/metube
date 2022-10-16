import express from "express";
import morgan from "morgan";
import session from "express-session";

import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRoouter";
import userRouter from "./routers/userRouter";

import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "asdfagsdf", //random value
    resave: false,
    saveUninitialized: true, //almost use resave: false, saveUn..: true
  })
);

app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

export default app;
